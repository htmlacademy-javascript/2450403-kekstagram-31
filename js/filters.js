import { BASE_URL, Route, ErrorText, RANDOM_PICTURES_AMOUNT } from './data.js';
import { showErrorBlockGet } from './methods-info-blocks.js';
import { createMiniPics } from './thumbnail-rendering.js';

const imgFilterSection = document.querySelector('.img-filters');
const filterDefault = imgFilterSection.querySelector('#filter-default');
const filterRandom = imgFilterSection.querySelector('#filter-random');
const filterDiscussed = imgFilterSection.querySelector('#filter-discussed');


const generateRandomPictures = (picsObj, count, cb) => {
  const randomPicturesObj = {};
  const totalPictures = Object.keys(picsObj).length;

  while (Object.keys(randomPicturesObj).length < count) {
    const randomIndex = Math.floor(Math.random() * totalPictures);
    const pictureId = Object.keys(picsObj)[randomIndex];
    const picture = picsObj[pictureId];

    if (!randomPicturesObj[pictureId]) {
      randomPicturesObj[pictureId] = picture;
    }
  }
  cb(Object.values(randomPicturesObj));
};

const getCommentsRank = (cb) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(ErrorText.GET_DATA);
      }
    })
    .then((photos) => {
      const photosArray = Object.values(photos);
      photosArray.sort((a, b) => b.comments.length - a.comments.length);
      const sortedPhotosObject = {};
      for (const photo of photosArray) {
        sortedPhotosObject[photo.id] = photo;
      }
      cb(Object.values(sortedPhotosObject).sort((a, b) => b.comments.length - a.comments.length));
    });
};

const filterDefaultImages = () => {
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
    })
    .catch(() => {
      showErrorBlockGet();
    });
};

const filterRandomImages = () => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(ErrorText.GET_DATA);
      }
    })
    .then((photos) => {
      generateRandomPictures(photos, RANDOM_PICTURES_AMOUNT, createMiniPics);
    })
    .catch(() => {
      showErrorBlockGet();
    });
};

const filterDiscussedImages = () => {
  getCommentsRank(createMiniPics).catch(() => {
    showErrorBlockGet();
  });
};

let currentFilter = 'default';

const selectFilter = (filterType) => {
  if (filterType !== currentFilter) {
    currentFilter = filterType;
    document.querySelectorAll('.img-filters__button').forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    document
      .querySelector(`#filter-${filterType}`)
      .classList.add('img-filters__button--active');
    clearPics();
    switch (filterType) {
      case 'default':
        filterDefaultImages();
        break;
      case 'random':
        filterRandomImages();
        break;
      case 'discussed':
        filterDiscussedImages();
        break;
    }
  }
};

function clearPics () {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
}

filterDefault.addEventListener('click', () => selectFilter('default'));
filterRandom.addEventListener('click', () => selectFilter('random'));
filterDiscussed.addEventListener('click', () => selectFilter('discussed'));

export { getCommentsRank, generateRandomPictures, filterDefaultImages, filterRandomImages, imgFilterSection};
