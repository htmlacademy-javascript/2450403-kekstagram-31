import { showSuccessBlock, showErrorBlock } from './methods-info-blocks.js';
import { pristine } from './validation.js';
import { imgUploadForm } from './upload-images.js';
import { handleFromError } from './image-effects.js';
import { uploadedImgPreview } from './image-resize.js';
import { BASE_URL, Route, ErrorText } from './data.js';

const sendData = (body) => {
  fetch(`${BASE_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText.GET_DATA);
      }
    })
    .catch(() => {
      showErrorBlock();
      handleFromError();
    });
};

const setImageSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      formData.append('image', uploadedImgPreview.src);

      const hashtagsInput = imgUploadForm.querySelector('[name="hashtags"]');
      const descriptionInput = imgUploadForm.querySelector('[name="description"]');
      formData.append('hashtags', hashtagsInput.value);
      formData.append('description', descriptionInput.value);

      fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if(response.ok) {
            onSuccess();
            showSuccessBlock();
          } else {
            throw new Error(ErrorText.SEND_DATA);
          }
        })
        .catch(() => {
          showErrorBlock();
          handleFromError();
        });
    }
  });
};


export {sendData, setImageSubmit};
