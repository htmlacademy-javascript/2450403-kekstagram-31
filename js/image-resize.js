import { imgUploadForm } from './upload-images.js';

const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const uploadedImgPreview = document.querySelector('.img-upload__preview img');

scaleControlValue.value = '100%';

const onMakeImageBiggerClick = (evt) => {
  evt.preventDefault();
  let biggerValue = parseInt(scaleControlValue.value, 10);
  if (biggerValue < 100) {
    biggerValue += 25;
  } else {
    biggerValue = 100;
  }
  scaleControlValue.value = `${biggerValue}%`;
  uploadedImgPreview.style.transform = `scale(${biggerValue / 100})`;
  return scaleControlValue.value;
};

const onMakeImageSmallerClick = (evt) => {
  evt.preventDefault();
  let smallerValue = parseInt(scaleControlValue.value, 10);
  if (smallerValue > 25) {
    smallerValue -= 25;
  } else {
    smallerValue = 25;
  }
  scaleControlValue.value = `${smallerValue}%`;
  uploadedImgPreview.style.transform = `scale(${smallerValue / 100})`;
  return scaleControlValue.value;
};

scaleControlBigger.addEventListener('click', onMakeImageBiggerClick);
scaleControlSmaller.addEventListener('click', onMakeImageSmallerClick);

export {uploadedImgPreview};
