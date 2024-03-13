import { pictureBlock, thumbnailInfoArray, createMiniPics } from './thumbnail-rendering.js';
import { onDocumentKeydown, onCloseBigPicture, openModal, closeModal, onPictureBlockClick } from './modals.js'
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const likesAmount = bigPicture.querySelector('.likes-count');
const bigImage = bigPicture.querySelector('.big-picture__img');

// const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
// const socialCaption = bigPicture.querySelector('.social__caption');
// const commentCountBlock = bigPicture.querySelector('.social__comment-total-count');
// const commentsLoader = bigPicture.querySelector('.comments-loader');

const socialComments = document.querySelector('.social__comments');
socialComments.innerHTML = '';

const renderingComments = (src, name, message) => {
  const socialCommentsList = document.createElement('li');
  socialCommentsList.classList.add('social__comment');

  const socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = src;
  socialPicture.alt = name;
  socialPicture.style.width = '35px';
  socialPicture.style.height = '35px';

  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = message;
  socialCommentsList.append(socialPicture, socialText);

  // socialComments.appendChild(socialCommentsList);

  return socialCommentsList;
};

const pictureMap = thumbnailInfoArray.reduce((acc, val) => {
  acc.set(String(val.id), val);
  return acc;
}, new Map());

const makeFullModal = (clikedPic, bigPic) => {
  const {url, description, likes, comments } = pictureMap.get(clikedPic.id);
  bigPic.querySelector('.big-picture__img').src = url;
  bigPic.querySelector('.likes-count').textContent = likes;
  bigPic.querySelector('.social__comment-total-count') = comments.length;
  bigPic.querySelector('.social__caption') = description;
  openModal();
};

// pictureBlock.children.forEach((picture) => {
//   picture.addEventListener('click', () =>{
//     bigPicture.classList.remove('hidden');
//     bigImage.querySelector('img').src = picture.querySelector('.picture__img').src;
//     likesAmount.textContent = picture.querySelector('.picture__likes').textContent;
//     commentsShownCount.textContent = picture.querySelector('.picture__comments').textContent;
//     commentsTotalCount.textContent = picture.picCommentsInfo.length;
//     bigPicture.querySelector('.social__caption').textContent = picture.querySelector('.img').alt;
//     bigPicture.querySelector('.social__comment-count.classList').add('hidden');
//     bigPicture.querySelector('.comments-loader').classList.add('hidden');
//     body.classList.add('modal-open');
//   });
// });

export { makeFullModal} ;
