function getRandomNum(min, max) {
  const LOWER_VALUE = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const UPPER_VALUE = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const RESULT = Math.random() * (UPPER_VALUE - LOWER_VALUE + 1) + LOWER_VALUE;

  return Math.floor(RESULT);
}

export {getRandomNum};
