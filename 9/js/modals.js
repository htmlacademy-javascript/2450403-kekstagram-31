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

function closeModal () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCloseBigPicture = () => {
  closeModal();
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};


function onPictureBlockClick (evt) {
  const chosenPicture = evt.target.closest('.picture');
  makeFullModal(chosenPicture, bigPicture);
}

pictureBlock.addEventListener('click', onPictureBlockClick);
bigPicture.addEventListener('click', onCloseBigPicture);

export {onDocumentKeydown, onCloseBigPicture, openModal, closeModal, onPictureBlockClick};
