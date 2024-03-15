import { isEscapeKey } from './utils.js';
import { pictureBlock } from './thumbnail-rendering.js';
import { makeFullModal, uploadComments, showMoreComments } from './open-full-picture.js';

const bigPicture = document.querySelector('.big-picture');
const loadMoreButton = document.querySelector('.social__comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCloseBigPicture = () => {
  closeModal();
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};


function onPictureBlockClick (evt) {
  const chosenPicture = evt.target.closest('.picture');
  makeFullModal(chosenPicture, bigPicture);
}

const onCommentsLoaderClick = function (evt) {
  evt.preventDefault();
  uploadComments();
  showMoreComments();
  console.log('click');
};

loadMoreButton.addEventListener('click', onCommentsLoaderClick);

pictureBlock.addEventListener('click', onPictureBlockClick);
bigPicture.addEventListener('click', onCloseBigPicture);
loadMoreButton.addEventListener('click', onCommentsLoaderClick);

export {onDocumentKeydown, onCloseBigPicture, openModal, closeModal, onPictureBlockClick, bigPicture, loadMoreButton };
