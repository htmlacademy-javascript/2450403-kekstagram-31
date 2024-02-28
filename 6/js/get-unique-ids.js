import {getRandomNum} from './get-random-num.js';

function getUniqueId(min, max) {
  const PREVIOUS_VALUE = [];

  return function() {
    let CURRENT_VALUE = getRandomNum(min, max);
    if (PREVIOUS_VALUE.length >= (max - min + 1)) {
      return null;
    }
    while (PREVIOUS_VALUE.includes(CURRENT_VALUE)) {
      CURRENT_VALUE = getRandomNum(min, max);
    }
    PREVIOUS_VALUE.push(CURRENT_VALUE);
    return CURRENT_VALUE;
  };
}

function getUniqueCommentId() {
  let commentId = 0;

  return function() {
    return commentId++;
  };
}

export {getUniqueId, getUniqueCommentId};
