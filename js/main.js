import './utils.js';
import './modals.js';
import './open-full-picture.js';
import './upload-images.js';
import './validation.js';
import './image-resize.js';
import './image-effects.js';
import './api.js';
import './methods-info-bloks.js';
import { setImageSubmit } from './api.js';
import { createMiniPics } from './thumbnail-rendering.js';
import { onCloseImgUpload } from './upload-images.js';
import { showErrorBlockGet } from './methods-info-bloks.js';
import { BASE_URL, Route, ErrorText} from './data.js';
import './filters.js';
import { imgFilterSection } from './filters.js';

fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(ErrorText.GET_DATA);
    }
  })
  .then((photos) => {
    createMiniPics(photos);
    imgFilterSection.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    showErrorBlockGet();
  });


setImageSubmit(onCloseImgUpload);
