import { getRandomNum } from './get-random-num.js';
import { getUniqueId } from './get-unique-ids.js';

const TEMPLATE_BLOCK = document.querySelector('#picture').content;
const PICTURE_BLOCK = document.querySelector('.pictures');

function createThumbnailInfo(minLikes, maxLikes, minComments, maxComments) {
  return {
    url: `photos/${getUniqueId(1, 25)()}.jpg`,
    description: 'Вот такое вот фото',
    likes: getRandomNum(minLikes, maxLikes),
    comments: getRandomNum(minComments, maxComments)
  };
}

function getThumbnail (howManyThumbnails, template, block) {
  for (let i = 1; i <= howManyThumbnails; i++) {
    const CLONED_TEMPLATE = template.cloneNode(true);
    const IMAGE = CLONED_TEMPLATE.querySelector('img');
    const PIC_LIKES = CLONED_TEMPLATE.querySelector('.picture__likes');
    const PIC_COMMENTS = CLONED_TEMPLATE.querySelector('.picture__comments');

    const NEW_PIC = createThumbnailInfo(15, 200, 1, 30);
    IMAGE.src = NEW_PIC.url;
    IMAGE.alt = NEW_PIC.description;
    PIC_LIKES.textContent = NEW_PIC.likes;
    PIC_COMMENTS.textContent = NEW_PIC.comments;

    block.appendChild(CLONED_TEMPLATE);
  }
}

export { TEMPLATE_BLOCK, PICTURE_BLOCK, getThumbnail };
