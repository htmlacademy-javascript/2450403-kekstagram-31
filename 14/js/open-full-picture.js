import { openModal, bigPicture, loadMoreButton } from './modals.js';
import { COMMENTS_LIMIT } from './data.js';


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

let currentIndex = 0;

const uploadComments = () => {
  const commentsArray = bigPicture.querySelectorAll('.social__comment');
  const currentLength = currentIndex + COMMENTS_LIMIT;
  const threshold = (commentsArray.length > currentLength) ? currentLength : commentsArray.length;

  document.querySelector('.social__comment-shown-count').textContent = threshold;

  for (let i = currentIndex; i < threshold; i++) {
    commentsArray[i].classList.remove('hidden');
  }

  currentIndex += COMMENTS_LIMIT;

  if (threshold >= commentsArray.length) {
    loadMoreButton.classList.add('hidden');
    currentIndex = 0;
  } else {
    loadMoreButton.classList.remove('hidden');
  }
};


const makeFullModal = (clikedPic, bigPic) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      const photosArray = Array.from(photos);
      const pictureMap = photosArray.reduce((acc, val) => {
        acc.set(String(val.id), val);
        return acc;
      }, new Map());

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

      const commentArr = bigPic.querySelectorAll('.social__comment');
      commentArr.forEach((commentElem) => {
        commentElem.classList.add('hidden');
      });

      uploadComments();
    });
};

export { makeFullModal, uploadComments};
