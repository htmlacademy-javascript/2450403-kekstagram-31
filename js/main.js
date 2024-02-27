import { getRandomnNum } from './get-random-num.js';
import { getComment} from './get-comment.js';
import { getUniqueId } from './get-unique-ids.js';

const OBJ_ID = getUniqueId(1, 25);
const URL_ID = getUniqueId(1, 25);

const LIKES = getRandomnNum(15, 200);

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
console.log(createObject(OBJ_ID, URL_ID));

