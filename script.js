'use strict';

const restartButton = document.querySelector('.again');
const hiddenNumber = document.querySelector('.question');
const guessNumber = document.querySelector('.number-input');
const checkButtonForm = document.querySelector('.left-form');
const checkButton = document.querySelector('.check');
const promoMessage = document.querySelector('.guess-message');
const score = document.querySelector('.score');
const betterScore = document.querySelector('.highscore');

//  GAME SETTING

const DEFAULT_COLOR = 'rgb(0, 0, 0)';
const SUCCESS_COLOR = 'rgb(9, 250, 21)';
const FAIL_COLOR = 'rgb(250, 0, 0)';

const DEFAULT_TITLE = 'Начни угадывать!';
const SUCCESS_TITLE = 'Бинго!';
const FAIL_TITLE = 'Проиграл :(';
const OVER_TITLE = 'Слишком много';
const FEW_TITLE = 'Слишком мало';

const DEFAULT_SCORE = '20';
const DEFAULT_HIDDEN_TITLE = '???';

//

let userScores = [];

const getRandomNumber = () => {
  return (Math.trunc(Math.random() * 20) + 1).toString();
};

let result = getRandomNumber();

const makeGameSettings = (color, title, boolean, hiddenTitle) => {
  document.body.style.background = color;
  promoMessage.textContent = title;
  hiddenNumber.textContent = hiddenTitle;
  checkButton.disabled = boolean;
};

const onRestartButtonClick = () => {
  makeGameSettings(DEFAULT_COLOR, DEFAULT_TITLE, false, DEFAULT_HIDDEN_TITLE);
  guessNumber.value = '';
  score.textContent = DEFAULT_SCORE;
  result = getRandomNumber();
};

const createHints = (randomNumber, userNumber) => {
  randomNumber > userNumber
    ? (promoMessage.textContent = FEW_TITLE)
    : (promoMessage.textContent = OVER_TITLE);
};

const showBetterScore = (array, points) => {
  const sortArray = array.sort((a, b) => a - b);
  points.textContent = sortArray[sortArray.length - 1];
};

checkButtonForm.addEventListener('submit', evt => {
  evt.preventDefault();
  createHints(+result, +guessNumber.value);

  if (guessNumber.value === result) {
    makeGameSettings(SUCCESS_COLOR, SUCCESS_TITLE, true, guessNumber.value);
    userScores.push(+score.textContent);
    showBetterScore(userScores, betterScore);
  } else {
    score.textContent--;
  }

  if (score.textContent === '0') {
    makeGameSettings(FAIL_COLOR, FAIL_TITLE, true, result);
  }
});

restartButton.addEventListener('click', onRestartButtonClick);
