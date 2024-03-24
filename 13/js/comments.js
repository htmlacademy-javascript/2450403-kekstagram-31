import { getRandomNum, getUniqueCommentId, getUniqueId } from './utils.js';
import { MESSAGES, NAMES, MAX_ID } from './data.js';

const commentId = getUniqueCommentId();

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

const uniqueIdUrl = getUniqueId(MAX_ID);
const uniqueId = getUniqueId(MAX_ID);

function createThumbnailInfo(minLikes, maxLikes) {
  return {
    id: uniqueId(),
    url: `photos/${uniqueIdUrl()}.jpg`,
    description: 'Вот такое вот фото',
    likes: getRandomNum(minLikes, maxLikes),
    comments: getComment()
  };
}


export { getComment, createThumbnailInfo };
