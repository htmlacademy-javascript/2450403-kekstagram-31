const templateBlock = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

const createMiniPics = (picsObj) => {
  const pictureFragment = document.createDocumentFragment();
  const thumbnailInfoArray = Array.from(picsObj);
  thumbnailInfoArray.forEach((picture) => {
    const clonedTemplate = templateBlock.cloneNode(true);
    clonedTemplate.setAttribute('id', picture.id);
    clonedTemplate.querySelector('.picture__img').src = picture.url;
    clonedTemplate.querySelector('.picture__img').alt = picture.description;
    clonedTemplate.querySelector('.picture__comments').textContent = picture.comments.length;
    clonedTemplate.querySelector('.picture__likes').textContent = picture.likes;
    pictureFragment.appendChild(clonedTemplate);
  });
  pictureBlock.appendChild(pictureFragment);
};

export { pictureBlock, createMiniPics };
