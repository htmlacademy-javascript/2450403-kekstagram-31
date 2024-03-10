import { getRandomNum, getUniqueId } from './utils.js';
import { getComment } from './get-comment.js';

const templateBlock = document.querySelector('#picture').content;
const pictureBlock = document.querySelector('.pictures');

const uniqueIdUrl = getUniqueId(25);
const uniqueId = getUniqueId(25);

function createThumbnailInfo(minLikes, maxLikes) {
  return {
    id: uniqueId(),
    url: `photos/${uniqueIdUrl()}.jpg`,
    description: 'Вот такое вот фото',
    likes: getRandomNum(minLikes, maxLikes),
    comments: getComment()
  };
}

function getThumbnail (howManyThumbnails, template) {
  const pictureFragment = document.createDocumentFragment();

  for (let i = 1; i <= howManyThumbnails; i++) {
    const clonedTemplate = template.cloneNode(true);
    const image = clonedTemplate.querySelector('img');
    const picLikes = clonedTemplate.querySelector('.picture__likes');
    const picComments = clonedTemplate.querySelector('.picture__comments');

    const newPic = createThumbnailInfo(15, 200, 1, 30);
    image.src = newPic.url;
    image.alt = newPic.description;
    picLikes.textContent = newPic.likes;
    const picCommentsInfo = newPic.comments;
    picComments.textContent = picCommentsInfo.length;

    pictureFragment.appendChild(clonedTemplate);
  }

  return pictureFragment;
}

const thumbnailsFragment = getThumbnail(25, templateBlock);
pictureBlock.appendChild(thumbnailsFragment);


const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');

pictures.forEach((picture) => {
  picture.addEventListener('click', () =>{
    bigPicture.classList.remove('hidden');

    const bigImage = bigPicture.querySelector('.big-picture__img');
    bigImage.querySelector('img').src = picture.querySelector('.picture__img').src;

    const likesAmount = bigPicture.querySelector('.likes-count');
    likesAmount.textContent = picture.querySelector('.picture__likes').textContent;

    const commentsShownCount = bigPicture.querySelector('.social__comment-total-count');
    commentsShownCount.textContent = picture.querySelector('.picture__comments').textContent;

    const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
    commentsTotalCount.textContent = picture.picCommentsInfo.length;

    const socialComments = document.querySelector('.social__comments');
    socialComments.innerHTML = '';

    picture.picCommentsInfo.forEach((comment) => {
      const socialCommentsList = document.createElement('li');
      socialCommentsList.classList.add('social__comment');

      const socialPicture = document.createElement('img');
      socialPicture.classList.add('social__picture');
      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;
      socialCommentsList.appendChild(socialPicture);

      const socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = comment.message;
      socialCommentsList.appendChild(socialText);

      socialComments.appendChild(socialCommentsList);
    });

    const socialCaption = bigPicture.querySelector('.social__caption');
    socialCaption.textContent = picture.querySelector('.img').alt;

    const commentCountBlock = bigPicture.querySelector('.social__comment-total-count');
    commentCountBlock.classList.add('hidden');

    const commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');

    const body = document.querySelector('body');
    body.classList.add('modal-open');
  });
});

export { templateBlock, pictureBlock, thumbnailsFragment, getThumbnail };
