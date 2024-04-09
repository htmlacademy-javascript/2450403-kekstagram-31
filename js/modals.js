import { isEscapeKey } from './utils.js';
import { pictureBlock } from './thumbnail-rendering.js';
import { makeFullModal, uploadComments } from './open-full-picture.js';

const bigPicture = document.querySelector('.big-picture');
const loadMoreButton = document.querySelector('.social__comments-loader');
const cancelBigPicture = document.querySelector('.big-picture__cancel');

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

const onOutsideClick = (evt) => {
  if (evt.target.classList.contains('big-picture')) {
    closeModal();
  }
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};


function onPictureBlockClick (evt) {
  const clickedElement = evt.target;

  if (!clickedElement.closest('.img__upload')) {
    const chosenPicture = evt.target.closest('.picture');
    if (chosenPicture) {
      makeFullModal(chosenPicture, bigPicture);
    }
  }
}

const onCommentsLoaderClick = (evt) => {
  evt.preventDefault();
  uploadComments();
};

const closeInfoSection = () => {
  const sectionClose = document.querySelector('.success__inner, .error__inner');
  const section = document.querySelector('section.success, section.error');
  sectionClose.remove();
  section.remove();
};

const onOutsideInfoBlockClick = (evt) => {
  const sectionClose = document.querySelector('.success__inner, .error__inner');
  if (!sectionClose.contains(evt.target)) {
    closeInfoSection();
  }
};

const closeOnEscapeInfoBlock = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeInfoSection();
    document.removeEventListener('click', closeOnEscapeInfoBlock);
  }
};


pictureBlock.addEventListener('click', onPictureBlockClick);
cancelBigPicture.addEventListener('click', onCloseBigPicture);
loadMoreButton.addEventListener('click', onCommentsLoaderClick);
document.addEventListener('click', onOutsideClick);

export {onDocumentKeydown, onCloseBigPicture, openModal, closeModal, onPictureBlockClick, closeInfoSection, onOutsideInfoBlockClick, closeOnEscapeInfoBlock, bigPicture, loadMoreButton };
