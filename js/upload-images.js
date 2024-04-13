import { isEscapeKey } from './utils.js';
import { resetEffects } from './image-effects.js';
import { imgUploadForm } from './image-resize.js';

const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadForm.querySelector('.img-upload__cancel');


const uploadNewImage = (evt) => {
  const uploadedImgPreview = document.querySelector('.img-upload__preview img');
  uploadedImgPreview.src = '';
  const file = evt.target.files[0];
  uploadedImgPreview.src = URL.createObjectURL(file);
  const effectsPreview = document.querySelectorAll('.effects__preview');
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${uploadedImgPreview.src})`;
  });
};

const onOverlayKeydown = (evt) => {
  const section = document.querySelector('section.success, section.error');
  if (isEscapeKey(evt) && !isInputFocused() && !section) {
    evt.preventDefault();
    closeImgUpload();
  }
};

function closeImgUpload () {
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayKeydown);
  resetEffects();
}

const onImgUploadInputChange = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayKeydown);
  document.body.classList.add('modal-open');
  uploadNewImage(evt);
};

const onCloseImgUpload = () => {
  closeImgUpload();
};

function isInputFocused() {
  const activeElement = document.activeElement;
  return activeElement.classList.contains('text__hashtags') || activeElement.classList.contains('text__description');
}

imgUploadInput.addEventListener('change', onImgUploadInputChange);
imgUploadCancelButton.addEventListener('click', onCloseImgUpload);


export {onImgUploadInputChange, onCloseImgUpload, imgUploadInput, imgUploadForm, imgUploadCancelButton, closeImgUpload};


