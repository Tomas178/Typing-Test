import { addClass, removeClass, removeExtraLetter, isExtraLetter } from './adders.js';
import { updateTimer } from './resultsTracker.js';
import { resetTest, restartTest } from './display.js';

export function handleTyping(e) {
  const key = e.key;
  const currentWord = document.querySelector('.word.current');
  const currentLetter = document.querySelector('letter.current');
  const expected = currentLetter?.textContent || ' ';
  const isLetter = key.length === 1 && key !== ' ';
  const isSpace = key === ' ';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord?.firstChild;

  // Check if the test is over. If it is over, do nothing (the user can't type anymore)
  if (document.querySelector('#wordsWrapper.over')) return;

  // handle enter key
  if (key === 'Enter') {
    restartTest();
  };

  // Handle escape key
  if (key === 'Escape') {
    resetTest();
  };

  // Start the timer if it hasn't been started yey
  if (!window.timer) {
    if (isLetter) {
      updateTimer();
    } else {
      return;
    }
  }

  // Handle letter keys
  if (isLetter) {
    handleLetterKey(currentWord, currentLetter, expected, key);
  };

  // Handle space
  if (isSpace) {
    handleSpaceKey(currentWord, currentLetter, expected);
  };

  // Handle backspace
  if (isBackspace) {
    handleBackspaceKey(currentWord, currentLetter, isFirstLetter);
  };

  // scroll lines / words
  updateLines(currentWord);

  // Move the caret
  updateCaret();
};

function handleLetterKey(currentWord, currentLetter, expected, key) {
  if (currentLetter) {
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      removeClass(currentLetter, 'current');
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, 'current');
      }
    } else {
      const incorrectLetter = document.createElement('letter');
      incorrectLetter.textContent = key;
      addClass(incorrectLetter, 'incorrect extra');
      currentWord.appendChild(incorrectLetter);
    }
}

function handleSpaceKey(currentWord, currentLetter, expected) {
  if (expected !== ' ') {
      const lettersToInvalidate = [...document.querySelectorAll('.word.current letter:not(.correct)')];
      lettersToInvalidate.forEach(letter => {
        addClass(letter, 'incorrect');
      });
    }
    addClass(currentWord, 'typed');
    removeClass(currentWord, 'current');
    addClass(currentWord.nextSibling, 'current');
    if (currentLetter) {
      removeClass(currentLetter, 'current');
    };

    //  check if the word was typed correctly by checking every letter
    const wordTypedCorrectly = Array.from(currentWord.children).every(letter => {
      return letter.classList.contains('correct');
    });

    // if the word was not typed correctly, add the error class to the word
    if (!wordTypedCorrectly) {
      addClass(currentWord, 'error');
    }
    addClass(currentWord.nextSibling.firstChild, 'current');
}

function handleBackspaceKey(currentWord, currentLetter, isFirstLetter) {
  try {
      if (currentLetter && isFirstLetter) {
      const previousWord = currentWord.previousSibling;
      removeClass(currentWord, 'current');
      addClass(previousWord, 'current');
      removeClass(currentLetter, 'current');
      addClass(previousWord.lastChild, 'current');
      removeClass(previousWord.lastChild, 'incorrect');
      removeClass(previousWord.lastChild, 'correct');
      removeClass(previousWord, 'error');
      removeClass(previousWord, 'typed');
      if (isExtraLetter(previousWord, previousWord.lastChild)) {
        removeExtraLetter(previousWord, previousWord.lastChild);
      };
    };
      if (currentLetter && !isFirstLetter) {
        removeClass(currentLetter, 'current');
        addClass(currentLetter.previousSibling, 'current');
        removeClass(currentLetter.previousSibling, 'incorrect');
        removeClass(currentLetter.previousSibling, 'correct');
        if (isExtraLetter(currentWord, currentLetter.previousSibling)) {
          removeExtraLetter(currentWord, currentLetter.previousSibling);
        }
      }
      if (!currentLetter) {
        addClass(currentWord.lastChild, 'current');
        removeClass(currentWord.lastChild, 'incorrect');
        removeClass(currentWord.lastChild, 'correct');
        if (isExtraLetter(currentWord, currentWord.lastChild)) {
          removeExtraLetter(currentWord, currentWord.lastChild);
        }
      };
    } catch (error) {
    };
}

// scrool the words up if the current word is in the bottom line
function updateLines(currentWord) {
  if (currentWord?.getBoundingClientRect().top > 420) {
    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');
    words.style.marginTop = (margin - 52) + 'px';
  };
};

// follow the current letter or word with the caret
function updateCaret() {
  const nextLetter = document.querySelector('letter.current');
  const wordsContainer = document.getElementById('wordsWrapper');
  const nextWord = document.querySelector('.word.current');
  const caret = document.getElementById('caret');
  const containerRect = wordsContainer.getBoundingClientRect();
  if (nextLetter && caret && wordsContainer) {
    const nextLetterRect = nextLetter.getBoundingClientRect();
    caret.style.top = (nextLetterRect.top - containerRect.top) + 2 + 'px';
    caret.style.left = (nextLetterRect.left - containerRect.left) + 'px';
  } else {
    const nextWordRect = nextWord?.getBoundingClientRect();
    caret.style.top = (nextWordRect?.top - containerRect.top) + 2 + 'px';
    caret.style.left = (nextWordRect?.right - containerRect.left) + 'px';
  };
};