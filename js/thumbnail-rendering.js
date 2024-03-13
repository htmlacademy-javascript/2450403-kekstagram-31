import { createThumbnailInfo } from './comments.js';
import { MIN_LIKES, MAX_LIKES, MAX_ID } from './data.js';

const templateBlock = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

const thumbnailInfoArray = Array.from({ length: MAX_ID }, () => createThumbnailInfo(MIN_LIKES, MAX_LIKES));

const createMiniPics = () => {
  const pictureFragment = document.createDocumentFragment();
  thumbnailInfoArray.forEach((picture) => {
    const clonedTemplate = templateBlock.cloneNode(true);
    clonedTemplate.setAttribute('id', picture.id);
    clonedTemplate.querySelector('.picture__img').src = picture.url;
    clonedTemplate.querySelector('.picture__img').alt = picture.description;
    clonedTemplate.querySelector('.picture__comments').textContent = picture.comments.length;
    clonedTemplate.querySelector('.picture__likes').textContent = picture.likes;
    pictureFragment.appendChild(clonedTemplate);
  });
  return pictureFragment;
};

export { pictureBlock, thumbnailInfoArray, createMiniPics };
