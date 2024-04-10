
import { ERROR_MESSAGE_TIME } from './data.js';
import { closeInfoSection, onOutsideInfoBlockClick, closeOnEscapeInfoBlock } from './modals.js';

const showErrorBlockGet = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataError = dataErrorTemplate.content.cloneNode(true);
  const sectionError = dataError.querySelector('.data-error');
  document.body.appendChild(sectionError);


  setTimeout(() => {
    sectionError.remove();
  }, ERROR_MESSAGE_TIME);
};

const showSuccessBlock = () => {
  const successBlockTemplate = document.querySelector('#success');
  const successBlock = successBlockTemplate.content.cloneNode(true);
  const closeSuccessButton = successBlock.querySelector('.success__button');

  document.body.appendChild(successBlock);

  closeSuccessButton.addEventListener('click',closeInfoSection);
  document.addEventListener('click', onOutsideInfoBlockClick);
  document.addEventListener('keydown', closeOnEscapeInfoBlock);
};


const showErrorBlock = () => {
  const errorBlockTemplate = document.querySelector('#error');
  const errorBlock = errorBlockTemplate.content.cloneNode(true);
  const closeErrorButton = errorBlock.querySelector('.error__button');

  document.body.appendChild(errorBlock);

  closeErrorButton.addEventListener('click',closeInfoSection);
  document.addEventListener('click', onOutsideInfoBlockClick);
  document.addEventListener('keydown', closeOnEscapeInfoBlock);
};

export {showErrorBlockGet, showSuccessBlock, showErrorBlock};
