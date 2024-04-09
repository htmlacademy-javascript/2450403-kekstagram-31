import { createMiniPics } from './thumbnail-rendering';
import { showErrorBlock } from './utils';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((photos) => {
    createMiniPics(photos);
  })
  .catch(() => {
    showErrorBlock();
  });
