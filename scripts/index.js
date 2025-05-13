import { displayWords, resetTest } from './UI/display.js';
import { handleTyping } from './UI/inputHandler.js';
import { test } from './app/settings.js';

document.addEventListener('DOMContentLoaded', () => {
  displayWords();

  const wordsInputField = document.querySelector('#wordsInput');
  wordsInputField.addEventListener('keyup', handleTyping);

  const wordsWrapper = document.querySelector('#wordsWrapper');
  wordsWrapper.addEventListener('click', () => {
    wordsInputField.focus();
  });

  const resetButton = document.getElementById('resetTestButton');
  resetButton.addEventListener('click', () => test.reset())
});

