import { isEscapeKey } from './utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadForm.querySelector('.img-upload__cancel');


const uploadNewImage = (evt) => {
  const uploadedImgPreview = document.querySelector('.img-upload__preview img');
  uploadedImgPreview.src = '';
  const file = evt.target.files[0];
  uploadedImgPreview.src = URL.createObjectURL(file);
};

const onOverlayKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFocused()) {
    evt.preventDefault();
    closeImgUpload();
  }
};

function closeImgUpload () {
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayKeydown);
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


