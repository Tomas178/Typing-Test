import { getPoetryDBResponse } from '../app/poetryService.js';
import * as ClassModifier from './classModifier.js';
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
const instructions = document.getElementById('instructions');

const wpmCurrentCell = document.getElementById('wpmCurrentCell');
const wpmPreviousCell = document.getElementById('wpmPreviousCell');
const wpmComparisonCell = document.getElementById('wpmComparisonCell');
const wpmAllTimeBestCell = document.getElementById('wpmAllTimeBestCell');

const accuracyCurrentCell = document.getElementById('accuracyCurrentCell');
const accuracyPreviousCell = document.getElementById('accuracyPreviousCell');
const accuracyComparisonCell = document.getElementById('accuracyComparisonCell');
const accuracyAllTimeBestCell = document.getElementById('accuracyAllTimeBestCell');

function showLoading() {
  if (!wordsContainer.querySelector('.loading')) {
    const loadingElement = document.createElement('div');
    ClassModifier.addClass(loadingElement, 'loading');
    loadingElement.textContent = 'Loading Poem...';
    wordsContainer.appendChild(loadingElement);
    caret.style.display = 'none';
  }
}

function hideLoading() {
  const loadingElement = wordsContainer.querySelector('.loading');
  if (loadingElement) {
    loadingElement.remove();
  }

  caret.style.display = 'block';
}

export async function displayWords() {
  showLoading();

  const Poem = await getPoetryDBResponse();

  hideLoading();

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

  ClassModifier.updateFirstWordFirstLetter();
}

export function displayResults(wpm, accuracy) {
  wpmBox.textContent = wpm;
  accuracyBox.textContent = accuracy;
  timerBox.style.display = 'none';
  wordsWrapper.style.display = 'none';
  instructions.style.display = 'none';
  typingResults.style.display = 'flex';
  displayResultsBox.style.display = 'grid';

  displayResultsTable();
}

function displayResultsTable() {
  const previousTestResults = localStorageHelper.getPreviousTestResults();
  const currentTestResults = localStorageHelper.getCurrentTestResults();
  const bestTestResults = localStorageHelper.getBestTestResults();

  ClassModifier.removeAllClassesFromComparisonCell(wpmComparisonCell);
  ClassModifier.removeAllClassesFromComparisonCell(accuracyComparisonCell);

  // currentTestResults will never be null therefore, we only need to check for previousTestResults
  if (previousTestResults === null) {
    displayFirstResultsTableState(currentTestResults, bestTestResults);
  } else {
    wpmCurrentCell.textContent = currentTestResults.wpm;
    wpmPreviousCell.textContent = previousTestResults.wpm;
    wpmComparisonCell.textContent = localStorageHelper.compareWpm();
    if (wpmComparisonCell.textContent !== '-') {
      displayWpmComparisonCell();
    }
    wpmAllTimeBestCell.textContent = bestTestResults.wpm;

    accuracyCurrentCell.textContent = currentTestResults.accuracy;
    accuracyPreviousCell.textContent = previousTestResults.accuracy;
    accuracyComparisonCell.textContent = localStorageHelper.compareAccuracy();
    if (accuracyComparisonCell.textContent !== '-') {
      displayAccuracyComparisonCell();
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
  instructions.style.display = 'block';
  timeInNumbers.textContent = 60;
  wordsContainer.style.marginTop = '0px';
  caret.style.cssText = 'font-size: 2rem; animation-name: caretFlashSmooth; opacity: 1; top: 6px; left: 8.5px;';
  displayWords();
  ClassModifier.removeClass(wordsWrapper, 'over');
  wordsInput.focus();
}

export function restartTest() {
  const words = [...wordsContainer.querySelectorAll('.word.typed'), wordsContainer.querySelector('.word.current')];
  words.forEach(word => {
    ClassModifier.removeAllClassesFromWord(word);
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
  ClassModifier.updateFirstWordFirstLetter();
  timeInNumbers.textContent = 60;
  wordsContainer.style.marginTop = '0px';
  caret.style.cssText = 'font-size: 2rem; animation-name: caretFlashSmooth; opacity: 1; top: 6px; left: 8.5px;';
  ClassModifier.removeClass(wordsWrapper, 'over');
  wordsInput.focus();
}

function displayWpmComparisonCell() {
  if (wpmComparisonCell.textContent === 'same') {
    ClassModifier.addClass(wpmComparisonCell, 'same');
  } else {
    ClassModifier.addClass(wpmComparisonCell, localStorageHelper.compareWpm() === 'better' ? 'better' : 'worse');
  }
}

function displayAccuracyComparisonCell() {
  if (accuracyComparisonCell.textContent === 'same') {
    ClassModifier.addClass(accuracyComparisonCell, 'same');
  } else {
    ClassModifier.addClass(accuracyComparisonCell, localStorageHelper.compareAccuracy() === 'better' ? 'better' : 'worse');
  }
}

function displayFirstResultsTableState(currentTestResults, bestTestResults) {
  wpmCurrentCell.textContent = currentTestResults.wpm;
  wpmPreviousCell.textContent = '-';
  wpmComparisonCell.textContent = '-';
  wpmAllTimeBestCell.textContent = bestTestResults.wpm;

  accuracyCurrentCell.textContent = currentTestResults.accuracy;
  accuracyPreviousCell.textContent = '-';
  accuracyComparisonCell.textContent = '-';
  accuracyAllTimeBestCell.textContent = bestTestResults.accuracy;
}