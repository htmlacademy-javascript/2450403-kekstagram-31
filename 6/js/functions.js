const checkStringLength = (string, length) => string.length <= length;

const isPalindrome = function(string) {
  const targetString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = targetString.length - 1; i >= 0; i--) {
    newString += targetString[i];
  }
  return targetString === newString;
};


const getInteger = function(string) {
  string = string.toString();
  let parseIneger = '';
  for (let i = 0; i < string.length; i++) {
    if (Number(string[i]) || string[i] === '0') {
      parseIneger += (+string[i]);
    }
  }
  return parseInt(parseIneger, 10);
};

// eslint-disable-next-line
console.log(checkStringLength('проверяемая строка', 20));
// eslint-disable-next-line
console.log(isPalindrome('Лёша на полке клопа нашёл '));
// eslint-disable-next-line
console.log(getInteger('1 кефир, 0.5 батона'));
