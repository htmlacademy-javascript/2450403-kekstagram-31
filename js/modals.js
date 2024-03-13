import { isEscapeKey } from './utils.js';
import { pictureBlock } from './thumbnail-rendering.js';
import { makeFullModal } from './open-full-picture.js';

const bigPicture = document.querySelector('.big-picture');
// const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }

};

const closeModal = () => {
  bigPicture.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseBigPicture = () => {
  closeModal();
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};


const onPictureBlockClick = (evt) => {
  const chosenPicture = evt.target.closest('.pictures');

  makeFullModal(chosenPicture, bigPicture);
  openModal();
};

pictureBlock.addEventListener('click', onPictureBlockClick);

export {onDocumentKeydown, onCloseBigPicture, openModal, closeModal, onPictureBlockClick};
