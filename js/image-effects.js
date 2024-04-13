import { imgUploadForm } from './image-resize.js';
import { uploadedImgPreview } from './image-resize.js';

const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
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
  effectLevelValue.textContent = effectLevelValue.value;
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

const resetEffects = () => {
  effectNone.checked = true;
  uploadEffectLevel.classList.add('hidden');
  uploadedImgPreview.style.filter = '';
  effectLevelSlider.noUiSlider.set(0);
};

export { uploadEffectLevel, effectNone, resetEffects };

