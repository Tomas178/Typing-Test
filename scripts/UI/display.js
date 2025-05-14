import { getPoetryDBResponse } from '../app/poetry.js';
import { addClass, removeClass } from './classModifiers.js';
import localStorageHelper from '../app/localStorage.js';

const wpmBox = document.getElementById('wpm');
const accuracyBox = document.getElementById('accuracy');
const timerBox = document.getElementById('timerBox');
const typingResults = document.getElementById('typingResults');
const timeInNumbers = document.querySelector('.timeInNumbers');
const caret = document.getElementById('caret');
const wordsInput = document.getElementById('wordsInput');
const wordsContainer = document.getElementById("words");
const wordsWrapper = document.getElementById('wordsWrapper');
const displayResultsBox = document.getElementById('displayResultsBox');

const wpmCurrentCell = document.getElementById('wpmCurrentCell');
const wpmPreviousCell = document.getElementById('wpmPreviousCell');
const wpmComparisonCell = document.getElementById('wpmComparisonCell');
const wpmAllTimeBestCell = document.getElementById('wpmAllTimeBestCell');

const accuracyCurrentCell = document.getElementById('accuracyCurrentCell');
const accuracyPreviousCell = document.getElementById('accuracyPreviousCell');
const accuracyComparisonCell = document.getElementById('accuracyComparisonCell');
const accuracyAllTimeBestCell = document.getElementById('accuracyAllTimeBestCell');

export async function displayWords() {
  const Poem = await getPoetryDBResponse();

  Poem.words.forEach(word => {
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word");

    [...word].forEach(char => {
      const letterSpan = document.createElement("letter");
      letterSpan.textContent = char;
      wordDiv.appendChild(letterSpan);
    });
    wordDiv.dataset.originalText = wordDiv.textContent;
    wordsContainer.appendChild(wordDiv);
  });

  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('letter'), 'current');
}

export function displayResults(wpm, accuracy) {
  wpmBox.textContent = wpm;
  accuracyBox.textContent = accuracy;
  timerBox.style.display = 'none';
  wordsWrapper.style.display = 'none';
  typingResults.style.display = 'flex';
  displayResultsBox.style.display = 'grid';

  displayResultsTable();
}

function displayResultsTable() {
  const previousTestResults = localStorageHelper.getPreviousTestResults();
  const currentTestResults = localStorageHelper.getCurrentTestResults();
  const bestTestResults = localStorageHelper.getBestTestResults();

  // previousTestResults will never be null therefore, we only need to check for currentTestResults
  if (previousTestResults === null) {
    wpmCurrentCell.textContent = currentTestResults.wpm;
    wpmPreviousCell.textContent = '-';
    wpmComparisonCell.textContent = '-';
    wpmAllTimeBestCell.textContent = bestTestResults.wpm;


    accuracyCurrentCell.textContent = currentTestResults.accuracy;
    accuracyPreviousCell.textContent = '-';
    accuracyComparisonCell.textContent = '-';
    accuracyAllTimeBestCell.textContent = bestTestResults.accuracy;
  } else {
    wpmCurrentCell.textContent = currentTestResults.wpm;
    wpmPreviousCell.textContent = previousTestResults.wpm;
    wpmComparisonCell.textContent = localStorageHelper.compareWpm();
    if (wpmComparisonCell.textContent !== '-') {
      if (wpmComparisonCell.textContent === 'same') {
        removeClass(wpmComparisonCell, 'better');
        removeClass(wpmComparisonCell, 'worse');
        removeClass(wpmComparisonCell, 'same');
        addClass(wpmComparisonCell, 'same');
      } else {
        removeClass(wpmComparisonCell, 'better');
        removeClass(wpmComparisonCell, 'worse');
        removeClass(wpmComparisonCell, 'same');
        addClass(wpmComparisonCell, localStorageHelper.compareWpm() === 'better' ? 'better' : 'worse');
      }
    }
    wpmAllTimeBestCell.textContent = bestTestResults.wpm;

    accuracyCurrentCell.textContent = currentTestResults.accuracy;
    accuracyPreviousCell.textContent = previousTestResults.accuracy;
    accuracyComparisonCell.textContent = localStorageHelper.compareAccuracy();
    if (accuracyComparisonCell.textContent !== '-') {
      if (accuracyComparisonCell.textContent === 'same') {
        removeClass(accuracyComparisonCell, 'better');
        removeClass(accuracyComparisonCell, 'worse');
        removeClass(accuracyComparisonCell, 'same');
        addClass(accuracyComparisonCell, 'same');
      } else {
        removeClass(accuracyComparisonCell, 'better');
        removeClass(accuracyComparisonCell, 'worse');
        removeClass(accuracyComparisonCell, 'same');
        addClass(accuracyComparisonCell, localStorageHelper.compareAccuracy() === 'better' ? 'better' : 'worse');
      }
    }
    accuracyAllTimeBestCell.textContent = bestTestResults.accuracy;
  }
}

export function resetTest() {
  wordsContainer.innerHTML = '';
  wpmBox.textContent = '-';
  accuracyBox.textContent = '-';
  timerBox.style.display = 'block';
  typingResults.style.display = 'none';
  displayResultsBox.style.display = 'none';
  wordsWrapper.style.display = 'block';
  timeInNumbers.textContent = 60;
  wordsContainer.style.marginTop = '0px';
  caret.style.cssText = 'font-size: 2rem; animation-name: caretFlashSmooth; opacity: 1; top: 6px; left: 8.5px;';
  displayWords();
  removeClass(wordsWrapper, 'over');
  wordsInput.focus();
}

export function restartTest() {
  const words = [...wordsContainer.querySelectorAll('.word')];
  words.forEach(word => {
    removeClass(word, 'typed');
    removeClass(word, 'error');
    removeClass(word, 'current');
    word.innerHTML = '';
    [...word.dataset.originalText].forEach(char => {
      const letterSpan = document.createElement('letter');
      letterSpan.textContent = char;
      word.appendChild(letterSpan);
    });
  });
  wpmBox.textContent = '-';
  accuracyBox.textContent = '-';
  timerBox.style.display = 'block';
  displayResultsBox.style.display = 'none';
  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('letter'), 'current');
  timeInNumbers.textContent = 60;
  wordsContainer.style.marginTop = '0px';
  caret.style.cssText = 'font-size: 2rem; animation-name: caretFlashSmooth; opacity: 1; top: 6px; left: 8.5px;';
  removeClass(wordsWrapper, 'over');
  wordsInput.focus();
}