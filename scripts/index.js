import { displayWords } from './UI/display.js';
import { handleTyping } from './UI/inputHandler.js';
import Test from './app/test.js';

const test = new Test();

document.addEventListener('DOMContentLoaded', () => {
  displayWords();

  const wordsInputField = document.getElementById('wordsInput');
  wordsInputField.addEventListener('keyup', handleTyping);

  const wordsWrapper = document.getElementById('wordsWrapper');
  wordsWrapper.addEventListener('click', () => {
    wordsInputField.focus();
  });

  const resetButton = document.getElementById('resetTestButton');
  resetButton.addEventListener('click', () => test.reset())
});

