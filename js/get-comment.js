import { getRandomnNum } from './get-random-num.js';
import { getUniqueCommentId } from './get-unique-ids.js';

const COMMENT_ID = getUniqueCommentId();
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Артём', 'Виктор', 'Ольга', 'Анна', 'Дмитрий', 'Ирина'];

const getComment = () => {
  const COMMENTS = [];
  for (let i = 0; i <= getRandomnNum(0, 30); i++) {
    COMMENTS.push({ id: COMMENT_ID(),
      avatar: `img/avatar-${getRandomnNum(1, 6)}.svg`,
      message: MESSAGES[getRandomnNum(1, MESSAGES.length - 1)],
      name: NAMES[getRandomnNum(1, NAMES.length - 1)]
    });
  }
  return COMMENTS;
};

export {getComment};
