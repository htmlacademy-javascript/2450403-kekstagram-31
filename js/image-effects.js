import { imgUploadForm } from './upload-images.js';
import { uploadedImgPreview } from './image-resize.js';
import {imgUploadCancelButton } from './upload-images.js';
import { validateForm, imgUploadButton } from './validation.js';

const effectLevelValue = imgUploadForm.querySelector('.effect-level__value'); // значение
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider'); // отображение значения
const uploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectNone = imgUploadForm.querySelector('#effect-none');
const effectChrome = imgUploadForm.querySelector('#effect-chrome');
const effectSepia = imgUploadForm.querySelector('#effect-sepia');
const effectMarvin = imgUploadForm.querySelector('#effect-marvin');
const effectPhobos = imgUploadForm.querySelector('#effect-phobos');
const effectHeat = imgUploadForm.querySelector('#effect-heat');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 10,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.textContent = effectLevelValue.value; // не отображается число в рамках textContent, хотя в console.log всё отображается
});

effectNone.checked = true;
uploadEffectLevel.classList.add('hidden');

effectNone.addEventListener('change', () => {
  if (effectNone.checked) {
    uploadEffectLevel.classList.add('hidden');
    uploadedImgPreview.style.filter = '';
  }
});

effectChrome.addEventListener('change', () => {
  if (effectChrome.checked) {
    uploadEffectLevel.classList.remove('hidden');

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 0,
      step: 0.1
    });
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    uploadedImgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  });
});

effectSepia.addEventListener('change', () => {
  if (effectSepia.checked) {
    uploadEffectLevel.classList.remove('hidden');

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 0,
      step: 0.1
    });
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    uploadedImgPreview.style.filter = `sepia(${effectLevelValue.value})`;
  });
});

effectMarvin.addEventListener('change', () => {
  if (effectMarvin.checked) {
    uploadEffectLevel.classList.remove('hidden');

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 0,
      step: 1
    });
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    uploadedImgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  });
});

effectPhobos.addEventListener('change', () => {
  if (effectPhobos.checked) {
    uploadEffectLevel.classList.remove('hidden');

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 0,
      step: 0.1
    });
  }
  effectLevelSlider.noUiSlider.on('update', () => {
    uploadedImgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  });
});

effectHeat.addEventListener('change', () => {
  if (effectHeat.checked) {
    uploadEffectLevel.classList.remove('hidden');

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 0,
      step: 0.1
    });
  }
  effectLevelSlider.noUiSlider.on('update', () => {
    uploadedImgPreview.style.filter = `brightness(${effectLevelValue.value})`;
  });
});

const saveInfoAboutImage = () => {
  const hashtagsInput = imgUploadForm.querySelector('[name="hashtags"]').value;
  const descriptionInput = imgUploadForm.querySelector('[name="description"]').value;
  const effectStates = {
    chrome: effectChrome.checked,
    sepia: effectSepia.checked,
    marvin: effectMarvin.checked,
    phobos: effectPhobos.checked,
    heat: effectHeat.checked,
    noEffect: effectNone.checked,
    level: effectLevelSlider.noUiSlider.get()
  };
  const hashtagsAndDescription = {
    hashtags: hashtagsInput.value,
    description: descriptionInput.value
  };
  const imageSizeValue = {
    width: uploadedImgPreview.width,
    height: uploadedImgPreview.height
  };
  return { hashtagsAndDescription, effectStates, imageSizeValue };
};

const savedFormData = saveInfoAboutImage();

const resetFormData = () => {
  imgUploadForm.reset();
};

const handleFromError = () => {
  const { hashtagsAndDescription, effectStates, imageSizeValue } = savedFormData;
  const savedHashtags = imgUploadForm.querySelector('[name="hashtags"]');
  const savedDescription = imgUploadForm.querySelector('[name="description"]');

  if (savedHashtags.value) {
    savedHashtags.value = hashtagsAndDescription.hashtags.value;
  } else if (savedDescription.value) {
    savedDescription.value = hashtagsAndDescription.description.value;
  }

  const parentWidth = imgUploadForm.offsetWidth;
  const parentHeight = imgUploadForm.offsetHeight;
  const widthPercent = (imageSizeValue.width / parentWidth) * 100;
  const heightPercent = (imageSizeValue.height / parentHeight) * 100;
  uploadedImgPreview.style.width = `${widthPercent}%`;
  uploadedImgPreview.style.height = `${heightPercent}%`;

  for (const effect in effectStates) {
    switch (effect) {
      case 'noEffect':
        if (effectNone.noEffect) {
          uploadEffectLevel.classList.add('hidden');
          uploadedImgPreview.style.filter = ''; 
        }
        break;
      case 'chrome':
        if (effectStates.chrome) {
          effectStates.chrome.checked = true;
          uploadedImgPreview.style.filter = `grayscale(${effectStates.level})`;
        }
        break;
      case 'sepia':
        if (effectStates.sepia) {
          effectStates.chrome.checked = true;
          uploadedImgPreview.style.filter = `sepia(${effectStates.level})`;
        }
        break;
      case 'marvin':
        if (effectStates.marvin) {
          effectStates.chrome.checked = true;
          uploadedImgPreview.style.filter = `invert(${effectStates.level}%)`;
        }
        break;
      case 'phobos':
        if (effectStates.phobos) {
          uploadedImgPreview.style.filter = `blur(${effectStates.level}px)`;
        }
        break;
      case 'heat':
        if (effectStates.heat) {
          uploadedImgPreview.style.filter = `brightness(${effectStates.level})`;
        }
        break;
    }
  }
  imgUploadButton.disabled = false;
  validateForm();
  imgUploadCancelButton.addEventListener('click', resetFormData);
};


export { handleFromError, savedFormData };

