function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  let targetString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = targetString.length - 1; i >= 0; i--) {
    newString += targetString[i];
  }
  return targetString === newString;
}


function getInteger(string) {
  string = string.toString();
  let parseIneger = '';
  for (let i = 0; i < string.length; i++) {
    if (Number(string[i]) || string[i] == '0') {
      parseIneger += (+string[i]);
    }
  }
  return parseInt(parseIneger, 10);
}
