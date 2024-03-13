function getRandomNum(min, max) {
  const lowerValue = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upperValue = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upperValue - lowerValue + 1) + lowerValue;

  return Math.floor(result);
}

function getUniqueId(toWhatNumber) {
  let commentId = 1;

  return function() {
    if (commentId <= toWhatNumber) {
      return commentId++;
    } else {
      return null;
    }
  };
}

function getUniqueCommentId() {
  let commentId = 0;

  return function() {
    return commentId++;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomNum, getUniqueId, getUniqueCommentId, isEscapeKey };
