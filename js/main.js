import { getRandomNum } from './get-random-num.js'; // Предполагается, что правильное имя - getRandomNum
import { getComment } from './get-comment.js';
import { getUniqueId } from './get-unique-ids.js';

const objId = getUniqueId(1, 25)();
const urlId = getUniqueId(1, 25)();
const LIKES = getRandomNum(15, 200);

function createObject(obj, url) {
  return {
    id: obj,
    url: `photos/${url}.jpg`,
    description: 'Вот такое вот фото',
    likes: LIKES,
    comments: getComment()
  };
}

// eslint-disable-next-line
console.log(createObject(objId, urlId));
