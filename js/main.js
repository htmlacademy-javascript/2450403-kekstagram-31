function getRandomnNum(min, max) {
  const LOWER_VALUE = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const UPPER_VALUE = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const RESULT = Math.random() * (UPPER_VALUE - LOWER_VALUE + 1) + LOWER_VALUE;

  return Math.floor(RESULT);
}

function getUniqueId(min, max) {
  const PREVIOUS_VALUE = [];

  return function() {
    let CURRENT_VALUE = getRandomnNum(min, max);
    if (PREVIOUS_VALUE.length >= (max - min + 1)) {
      return null;
    }
    while (PREVIOUS_VALUE.includes(CURRENT_VALUE)) {
      CURRENT_VALUE = getRandomnNum(min, max);
    }
    PREVIOUS_VALUE.push(CURRENT_VALUE);
    return CURRENT_VALUE;
  };
}

function getUniqueCommentId() {
  let commentId = 0;

  return function() {
    return commentId++;
  };
}

const getComment = () => {
  const COMMENTS = [];
  const COMMENT_ID = getUniqueCommentId();
  const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const NAMES = ['Артём', 'Виктор', 'Ольга', 'Анна', 'Дмитрий', 'Ирина'];

  for (let i = 0; i <= getRandomnNum(0, 30); i++) {
    COMMENTS.push({ id: COMMENT_ID(),
      avatar: `img/avatar-${getRandomnNum(1, 6)}.svg`,
      message: MESSAGES[getRandomnNum(1, MESSAGES.length - 1)],
      name: NAMES[getRandomnNum(1, NAMES.length - 1)]
    });
  }
  return COMMENTS;
};

function createObject() {
  const OBJ_ID = getUniqueId(1, 25);
  const URL_ID = getUniqueId(1, 25);

  return {
    id: OBJ_ID(),
    url: `photos/${URL_ID()}.jpg`,
    description: 'Вот такое вот фото',
    likes: getRandomnNum(15, 200),
    comments: getComment()
  };
}

// eslint-disable-next-line
console.log(createObject());
