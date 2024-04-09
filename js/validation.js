import { imgUploadForm } from './upload-images.js';

const imgUploadButton = imgUploadForm.querySelector('.img-upload__submit'); // Добавить в основной проект

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: ' '
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
  if (!commentString) {
    return true;
  }
  const commentRegexp = /^[a-zа-яё0-9\s@#$%;]{0,140}$/i;
  return commentRegexp.test(commentString);
};


pristine.addValidator(
  imgUploadForm.querySelector('[name="hashtags"]'),
  validateHashTag
);

pristine.addValidator(
  imgUploadForm.querySelector('[name="description"]'),
  validateComment
);

const areHashtagsUnique = (hashtagString) => {
  if (!hashtagString) {
    return true;
  }

  const hashtags = hashtagString.split(' ');
  const uniqueHashtags = new Set(hashtags);

  return hashtags.length === uniqueHashtags.size;
};

const isValidСharacter = (hashtagString) => {
  if (!hashtagString) {
    return true;
  }
  const hashtags = hashtagString.split(' ');
  const hashtagRegexp = /^#[a-zа-яё0-9\s]{1,19}$/i;
  for (const hashtag of hashtags) {
    if (!hashtagRegexp.test(hashtag)) {
      return false;
    }
  }
  return true;
};

const areValidHashTags = (hashtagString) => {
  if (!hashtagString) {
    return true;
  }
  const hashtags = hashtagString.split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!hashtag.startsWith('#') || hashtag.length < 2) {
      return false;
    }

    if (i > 0 && !hashtags[i - 1].startsWith('#')) {
      return false;
    }
  }

  return true;
};


function validateForm() {
  const hashtagsInput = imgUploadForm.querySelector('[name="hashtags"]');
  const descriptionInput = imgUploadForm.querySelector('[name="description"]');
  const errorWrappers = imgUploadForm.querySelectorAll('.pristine-error');

  if (pristine.validate()) {
    imgUploadButton.disabled = false;
  } else {
    imgUploadButton.disabled = true;

    errorWrappers.forEach((wrapper) => {
      wrapper.classList.add('img-upload__field-wrapper--error');

      if (!areValidHashTags(hashtagsInput.value)) {
        wrapper.textContent = 'Ошибка: Неверный формат хэштега'; // ок ли, если выскакивет ошибка в случае '#Хэштег '?
      } else if (hashtagsInput.value.split(' ').length > 5) {
        wrapper.textContent = 'Ошибка: Превышено количество хэштегов';
      } else if (!isValidСharacter(hashtagsInput.value)) {
        wrapper.textContent = 'Ошибка: Недопустимый символ';
      } else if (!areHashtagsUnique(hashtagsInput.value)) {
        wrapper.textContent = 'Ошибка: Хэштеги должны быть уникальными';
      } else if (!descriptionInput.checkValidity()) {
        wrapper.textContent = 'Ошибка: Слишком длинный комментарий';
      }
    });
  }
}


imgUploadForm.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', validateForm);
  field.addEventListener('change', validateForm);
});

export {imgUploadButton, pristine, validateForm};
