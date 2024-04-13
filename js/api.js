import { showSuccessBlock, showErrorBlock } from './methods-info-blocks.js';
import { pristine, imgUploadButton } from './validation.js';
import { imgUploadForm } from './image-resize.js';
import { handleFromError } from './save-data.js';
import { uploadedImgPreview } from './image-resize.js';
import { BASE_URL, Route, ErrorText } from './data.js';


const setImageSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      imgUploadButton.disabled = true;
      const formData = new FormData(evt.target);
      formData.append('image', uploadedImgPreview.src);
      fetch(`${BASE_URL}${Route.SEND_DATA}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if(response.ok) {
            onSuccess();
            showSuccessBlock();
          } else {
            handleFromError(response);
            throw new Error(ErrorText.SEND_DATA);
          }
        })
        .catch(() => {
          showErrorBlock();
        })
        .finally(() => {
          imgUploadButton.disabled = false;
        });
    }
  });
};

export { setImageSubmit};
