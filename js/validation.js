import { imgUploadForm } from './upload-image';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const validateHashTag = (hashtagString) => {
  if (!hashtagString) {
    return true;
  }

  const hashtags = hashtagString.split(' ');

  const uniqueHashtags = new Set (hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  if (hashtags.length > 5) {
    return false;
  }

  const hashtagRegexp = /^#[a-zа-яё0-9\s]{1,19}$/i;
  for (const hashtag of hashtags) {
    if (!hashtagRegexp.test(hashtag)) {
      return false;
    }
  }
  return true;
};

const validateComment = (commentString) => {
  const commentRegexp = /^[a-zа-яё0-9\s]{0,140}$/i;
  return commentRegexp.test(commentString);
};


pristine.addValidator(
  imgUploadForm.querySelector('[name="hashtags"]'),
  validateHashTag,
  'Недопустимая длина или символ'
);


pristine.addValidator(
  imgUploadForm.querySelector('[name="description"]'),
  validateComment,
  'Слишком длинный комментарий'
);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
