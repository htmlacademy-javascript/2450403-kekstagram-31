import { getRandomNum } from './utils.js';
import { getUniqueCommentId } from './utils.js';

const commentId = getUniqueCommentId();
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
  const comments = [];
  for (let i = 0; i < getRandomNum(0, 30); i++) {
    comments.push({
      id: commentId(),
      avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
      message: MESSAGES[getRandomNum(0, MESSAGES.length - 1)],
      name: NAMES[getRandomNum(0, NAMES.length - 1)],
    });
  }
  return comments;
};

console.log(getComment());
export { getComment };
