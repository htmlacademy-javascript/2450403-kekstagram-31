const COMMENTS_LIMIT = 5;

const ERROR_MESSAGE_TIME = 5000;

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const RANDOM_PICTURES_AMOUNT = 10;
const TIME_LIMIT = 500;

export { BASE_URL, Route, ErrorText, COMMENTS_LIMIT, ERROR_MESSAGE_TIME, RANDOM_PICTURES_AMOUNT, TIME_LIMIT};
