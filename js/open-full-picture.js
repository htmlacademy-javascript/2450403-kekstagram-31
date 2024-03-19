import { pictureBlock, thumbnailInfoArray, createMiniPics } from './thumbnail-rendering.js';
import { openModal } from './modals.js';

pictureBlock.appendChild(createMiniPics());

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

  return socialCommentsList;
};

const pictureMap = thumbnailInfoArray.reduce((acc, val) => {
  acc.set(String(val.id), val);
  return acc;
}, new Map());

const makeFullModal = (clikedPic, bigPic) => {
  const {url, description, likes, comments } = pictureMap.get(clikedPic.id);
  bigPic.querySelector('.big-picture__img img').src = url;
  bigPic.querySelector('.likes-count').textContent = likes;
  bigPic.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPic.querySelector('.social__caption').textContent = description;
  openModal();
  const socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';
  comments.forEach((comment) => {
    socialComments.append(renderingComments(comment.avatar, comment.name, comment.message));
  });
};

export { makeFullModal} ;
