import { isEscapeKey } from './utils.js';
import { pictureBlock } from './thumbnail-rendering.js';
import { makeFullModal, uploadComments } from './open-full-picture.js';

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
  const clickedElement = evt.target;

  if (!clickedElement.closest('.img__uplod')) {
    const chosenPicture = evt.target.closest('.picture');
    if (chosenPicture) {
      makeFullModal(chosenPicture, bigPicture);
    }
  }
}

const onCommentsLoaderClick = function (evt) {
  evt.preventDefault();
  uploadComments();
};

pictureBlock.addEventListener('click', onPictureBlockClick);
bigPicture.addEventListener('click', onCloseBigPicture);
loadMoreButton.addEventListener('click', onCommentsLoaderClick);

export {onDocumentKeydown, onCloseBigPicture, openModal, closeModal, onPictureBlockClick, bigPicture, loadMoreButton };
