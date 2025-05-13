import { displayResults } from './display.js';
import { addClass } from './adders.js';
import { saveToLocalStorage } from '../app/localStorage.js';

const gameTime = 10 * 1000;
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

export function updateTimer() {
  window.timer = setInterval(() => {
    if (!window.gameStart) {
      window.gameStart = (new Date()).getTime();
    }
    const currentTime = (new Date()).getTime();
    const msPassed = currentTime - window.gameStart;
    const sPassed = Math.round(msPassed / 1000);
    const sLeft = (gameTime / 1000) - sPassed;

    if (sLeft <= 0) {
      gameOver();
    }
    document.querySelector('.timeInNumbers').textContent = sLeft;
  }, 1000);
}

export function getWpm() {
  const wordsTypedCorrectly = [...document.querySelectorAll('.word.typed:not(.error)')];
  return Math.round(wordsTypedCorrectly.length / gameTime * 60000);
}

export function getWordAccuracy() {
  const wordsTyped = [...document.querySelectorAll('.word.typed')];
  const wordsTypedCorrectly = [...document.querySelectorAll('.word.typed:not(.error)')];
  const accuracy = Math.round((wordsTypedCorrectly.length / wordsTyped.length) * 100);
  return isNaN(accuracy) ? 0 : accuracy;
}

function gameOver() {
  clearInterval(window.timer);
  addClass(document.querySelector('#wordsWrapper'), 'over');
  const wpm = getWpm();
  const accuracy = getWordAccuracy();
  saveToLocalStorage(wpm, accuracy);
  displayResults(wpm, accuracy);
}