import { pictureBlock, thumbnailInfoArray, createMiniPics } from './thumbnail-rendering.js';
import { openModal, bigPicture, loadMoreButton } from './modals.js';
import { COMMENTS_LIMIT } from './data.js';

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


const uploadComments = () => {
  const commentsArray = bigPicture.querySelectorAll('.social__comment.hidden');
  const commentsRemaining = commentsArray.length - COMMENTS_LIMIT;
  const commentsQuantity = (commentsRemaining > 0) ? COMMENTS_LIMIT : Math.max(commentsArray.length, 0);

  bigPicture.querySelector('.social__comment-shown-count').textContent = commentsQuantity;

  for (let i = 0; i < commentsQuantity; i++) {
    commentsArray[i].classList.remove('hidden');
  }

  if (commentsRemaining <= 0) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
};

const showMoreComments = () => {
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  const shownCount = bigPicture.querySelector('.social__comment-shown-count');

  if (hiddenComments.length > 0) {
    const commentsToShow = hiddenComments.length >= COMMENTS_LIMIT ? COMMENTS_LIMIT : hiddenComments.length;

    for (let i = 0; i < commentsToShow; i++) {
      hiddenComments[i].classList.remove('hidden');
    }

    shownCount.textContent = parseInt(shownCount.textContent, 10) + commentsToShow;

    if (hiddenComments.length <= COMMENTS_LIMIT || hiddenComments.length === 0) {
      loadMoreButton.classList.add('hidden');
    }
  }

  const visibleComments = document.querySelectorAll('.social__comment:not(.hidden)');
  if (visibleComments.length + hiddenComments.length <= COMMENTS_LIMIT) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
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
  const commentArr = bigPic.querySelectorAll('.social__comment');
  commentArr.forEach((commentElem) => {
    commentElem.classList.add('hidden');
  });
  uploadComments();
};

export { makeFullModal, uploadComments, showMoreComments} ;
