import { imgUploadForm } from './image-resize.js';
import { uploadedImgPreview } from './image-resize.js';
import { imgUploadButton, validateForm } from './validation';
import { imgUploadCancelButton } from './upload-images.js';
import { uploadEffectLevel, effectNone } from './image-effects.js';


const resetFormData = () => {
  imgUploadForm.reset();
};

const handleFromError = (savedData) => {
  const { hashtagsAndDescription, effectStates, imageSizeValue } = savedData;
  const savedHashtags = imgUploadForm.querySelector('[name="hashtags"]');
  const savedDescription = imgUploadForm.querySelector('[name="description"]');

  if (savedHashtags.value) {
    savedHashtags.value = hashtagsAndDescription.hashtags;
  } else if (savedDescription.value) {
    savedDescription.value = hashtagsAndDescription.description;
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

export {handleFromError};
