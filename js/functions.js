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


// Функция из дополнительного задания
const MINUTES_PER_HOUR = 60;

function getMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
}

function isDurationWorkday(start, end, meetingStart, meetingDuration) {
  const startWork = getMinutes(start);
  const endWork = getMinutes(end);
  const startMeeting = getMinutes(meetingStart);
  const endMeeting = startMeeting + meetingDuration;

  return endMeeting >= startWork && endMeeting <= endWork;
}

// eslint-disable-next-line
console.log(isDurationWorkday('08:00', '17:30', '14:00', 90)); // true
// eslint-disable-next-line
console.log(isDurationWorkday('8:0', '10:0', '8:0', 120));     // true
// eslint-disable-next-line
console.log(isDurationWorkday('08:00', '14:30', '14:00', 90)); // false
// eslint-disable-next-line
console.log(isDurationWorkday('14:00', '17:30', '08:0', 90));  // false
// eslint-disable-next-line
console.log(isDurationWorkday('8:00', '17:30', '08:00', 900)); // false
