# Typing Test Game

## Why should you use it?
- Improve typing speed and accuracy
- Boost focus
- Track progress over time
- Prepare for job interviews
- Familiarize with your keyboard
- Learn new words

## About the code
<details>
<summary><strong>poetry.js</strong></summary>

- <strong>class Poem</strong>

    **Instance variable/methods:**
    - Instance variable – words
    - Instance method – cleanUpText()

- <strong>getPoetryDBResponse</strong>

    ### Function logic
    - Gets response from poetry API and waits till it is fetched fully
    - Every line is split into words
    - Returns Poem object

</details>

<details>
<summary><strong>localStorage.js</strong></summary>

- <strong>class LocalStorageHelper</strong>

  **Functions:**

  <details>
  <summary><strong>saveToLocalStorage(wpm, accuracy)</strong></summary>

  **Function variables:**
  - `currentTestResults`
  - `bestTestResults`

  **Function logic:**
  - If there’s no `currentTestResults` → set Current and Best test results.
  - Otherwise, update them accordingly. 
  </details>

	<details>
	<summary><strong>getBestTestResults</strong></summary>

	**Function variables:**
  - `bestTestResults`

	**Function logic:**
	- if there is then returns `bestTestResults` otherwise, returns `null`.
	</details>

	<details>
	<summary><strong>getPreviousTestResults</strong></summary>

	**Function variables:**
	- `previousTestResults`

	**Function logic:**
	- if there is then returns `previousTestResults` otherwise, returns `null`.
	</details>

	<details>
	<summary><strong>getCurrentTestResults</strong></summary>

	**Function variables:**
	- `currentTestResults`

	**Function logic:**
	- if there is then returns `currentTestResults` otherwise, returns `null`.
	</details>

	<details>
	<summary><strong>compareWpm</strong></summary>

	**Function variables:**
	- `previousTestResults`
	- `currentTestResults`
	- `previousWpm`
	- `currentWpm`

	**Function logic:**
	- if `currentWpm === previousWpm` returns 'same'
	- if `currentWpm > previousWpm` returns 'better' else 'worse'
	</details>

	<details>
	<summary><strong>compareAccuracy</strong></summary>

	**Function variables:**
	- `previousTestResults`
	- `currentTestResults`
	- `previousAccuracy`
	- `currentAccuracy`

	**Function logic:**
	- if `currentAccuracy === previousAccuracy` returns 'same'
	- if `currentAccuracy > previousAccuracy` returns 'better' else 'worse'
	</details>

</details>

<details>
<summary><strong>classModifier.js</strong></summary>

- <strong>Functions:</strong>

	<details>
	<summary><strong>addClass(element, name)</strong></summary>

	**Parameters:**
	- element – element that the classname should be added to.
	- name – classname that should be added to the element.

	**Function logic:**
	- Adds classname: `name` to the `element`.
	</details>

	<details>
	<summary><strong>removeClass(element, name)</strong></summary>

	**Parameters:**
	- element – element that the classname should be removed from.
	- name – classname that should be removed from the element.

	**Function logic:**
	- Removes classname: `name` from the `element`.
	</details>

	<details>
	<summary><strong>isExtraLetter(letter)</strong></summary>

	**Parameters:**
	- `letter` – `<letter>` tag that is checked if it contains classname: 'extra'.

	**Function logic:**
	- Checks if the `letter` classlist contains a classname: 'extra'.
	</details>

	<details>
	<summary><strong>removeExtraLetter(word, letter)</strong></summary>

	**Parameters:**
	- `word` – `word` tag that the `letter` is removed from.
	- `letter` – `<letter>` tag that is removed from `word`.

	**Function logic:**
	- Removes `letter` from `word`.
	</details>

	<details>
	<summary><strong>removeAllClassesFromComparisonCell(comparisonCell)</strong></summary>

	**Parameters:**
	- `comparisonCell` – the comparisonCell that should be removed with all the possible classes.

	**Function logic:**
	- Removes all the possible classes from the `comparisonCell`
	</details>

	<details>
	<summary><strong>removeAllClassesFromWord(word)</strong></summary>

	**Parameters:**
	- `word` – word that should be removed with all the possible classes.

	**Function logic:**
	- Removes all the possible classes from the `word`.
	</details>

	<details>
	<summary><strong>updateFirstWordFirstLetter()</strong></summary>

	**Function logic:**
	- Adds class `current` to the first `<word>` and first `<letter>` tag.
	</details>

</details>

<details>
<summary><strong>display.js</strong></summary>

-	<details>
	<summary><strong>Show variables</strong></summary>

	**Variables:**
	- `wpmBox`
	- `accuracyBox`
	- `timerBox`
	- `typingResults`
	- `timeInNumbers`
	- `caret`
	- `wordsInput`
	- `wordsContainer`
	- `wordsWrapper`
	- `displayResultsBox `

	***Table variables***
	- `wpmCurrentCell`
	- `wpmPreviousCell`
	- `wpmComparisonCell`
	- `wpmAllTimeBestCell`
	- `accuracyCurrentCell`
	- `accuracyPreviousCell`
	- `accuracyComparisonCell`
	- `accuracyAllTimeBestCell`
	</details>

	**Functions:**
	<details>
	<summary><strong>showLoading</strong></summary>

	**Function logic:**
	- Creates a `<div class="loading">` inside of `#words` and hides `#caret`.
	</details>

	<details>
	<summary><strong>hideLoading</strong></summary>

	**Function logic:**
	- Removes a `<div class="loading">` inside of `#words` and displays `#caret`.
	</details>

	<details>
	<summary><strong>displayWords</strong></summary>

	**Variables:**
	- `Poem` – is a class Poem object.

	**Function logic:**
	- Gets `Poem`
	- For each word in a `Poem` a `<div class="word">` is created and then every char in a word is given a `<letter>` tag as a child to a `<div class="word">` and also data-original-text is set.
	- To the first ```html <div class="word">``` and first `<letter>` a class "current" is given.
	</details>

	<details>
	<summary><strong>displayResults(wpm, accuracy)</strong></summary>

	**Function logic:**
	- `wpmBox` and `accuracyBox` are updated with `wpm` and `accuracy`.
	- `timerBox` and `wordsWrapper` are hidden.
	`typingResults` and `displayResultsBox` are shown.
	- `DisplayResultsTable()` is called.
	</details>

	<details>
	<summary><strong>displayResultsTable</strong></summary>

	**Variables:**
	- `previousTestResults`
	- `currentTestResults`
	- `bestTestResults`

	**Function logic:**
	- if `previousTestResults` are `null` then only `currentTestResults` and `bestTestResults` are displayed.
	- else every variable values are shown. Also, `currentTest` and `previousTestResults` values are compared.
	</details>

	<details>
	<summary><strong>resetTest</strong></summary>

	**Function logic:**
	- Handles all the hiding and displaying of the elements when the test is reseted.
	- `DisplayWords()` is called.
	- Remove class `over` from `wordsWrapper`.
	- `wordsInput.focus()` is called to automatically focus on the typing test.
	</details>

	<details>
	<summary><strong>restartTest</strong></summary>

	**Function logic:**
	- Handles all the hiding and displaying of the elements when the test is restarted.
	- Remove class `over` from `wordsWrapper`.
	- `wordsInput.focus()` is called to automatically focus on the typing test.
	</details>

</details>

<details>
<summary><strong>test.js</strong></summary>

- <strong>class Test</strong>

  **Instance variable/methods:**
  - startTimer()
  - stopTimer()
  - getWpm()
  - getWordAccuracy()
  - endTest()
  - reset()
  - restart()
</details>

<details>
<summary><strong>settings.js</strong></summary>

  **Variables:**
  - `test = new Test()`
</details>

<details>
<summary><strong>inputHandler.js</strong></summary>

- **Functions:**

  <details>
  <summary><strong>handleTyping(e)</strong></summary>

  ***Variables:***
  - `key`
  - `currentWord`
  - `currentLetter`
  - `expected`
  - `ìsLetter`
  - `isSpace`
  - `isBackspace`
  - `isFirstLetter`
  - `isBackspaceAllowed`

  ***Function logic:***
  - if `document.querySelector('#wordsWrapper.over')` then the function returns.
  - if `key === 'Enter'` then the test restarts.
  - if `key === 'Escape'` then the test resets.
  - if `!test.timer` and `isLetter` then the test timer is started. Otherwise, function stops.
  - if `isBackspaceAllowed`is `true` and `!isLetter` then function stops.
  - if `isLetter` then `handleLetterKey(currentWord, currentLetter, expected, key)` is called.
  - if `isSpace` then `handleSpaceKey(currentWord, currentLetter, expected)` is called.
  - if `isBackspace` then `handleBackspaceKey(currentWord, currentLetter, isFirstLetter)` is called.
  - at the end `updateLines(currentWord)` and `updateCaret()` are called.
  </details>

  <details>
  <summary><strong>handleLetterKey(currentWord, currentLetter, expected, key)</strong></summary>

  ***Function logic:***
  - if `currentLetter` then:
    - `currentLetter` is added with `'correct'` or `'incorrect'` class.
    - class `'current'` is removed from the `currentLetter`.
    - if `currentLetter.nextSibling` then:
      - `currentLetter.nextSibling` is added a class `'current'`.
    - else:
      - new `<letter>` is created with classes `incorrect extra` and is added to the `currentWord`.
  </details>

  <details>
  <summary><strong>handleSpaceKey(currentWord, currentLetter, expected)</strong></summary>

  ***Function logic:***
  - if `expected` is not a Space key then:
    - all left letters in `currentWord` are added with a class `incorrect`.
  - `currentWord` is added a class `typed` and removed class called `current`.
  - next `<word>` is added with a class `current`.
  - if `currentLetter` then:
    - `currentLetter` is removed a class named `current`.
  - then a boolean variable `wordTypedCorrectly` is declared that has value `true` when every `letter` in `currentWord` has a class `'correct'`.
  - if `wordTypedCorrectly` is `false` then `currentWord` is given a class `error`.
  - and the next `<word>` first `letter` is given a class `current`.
  </details>

  <details>
  <summary><strong>handleBackspaceKey(currentWord, currentLetter, isFirstLetter)</strong></summary>

  ***Function logic:***
  - Try Catch block is used to catch and error when user entered `Backspace` key.
  - if `currentLetter && isFirstLetter` then:
    - `const previousWord = currentWord.previousSibling` is declared.
    - Class `current` is removed from `currentWord` and `currentLetter`.
    - Class `current` is added to the `previousWord` and `previousWord.lastChild`.
    - Classes `incorrect` and `correct` are removed from `previousWord.lastChild`.
    - Classes `error` and `typed` are removed from `previousWord`.
    - if `isExtraLetter(previousWord.lastChild)` then:
      - `removeExtraLetter(previousWord, previousWord.lastChild)` is called to remove `letter class="extra"`
  - if `currentLetter && !isFirstLetter` then:
    - Class `current` is removed from `currentLetter`.
    - Class `current` is added to `currentLeter`.
    - Classes `incorrect` and `correct` are removed from `currentLetter.previousSibling`.
    - if `isExtraLetter(currentLetter.previousSibling)` then:
      - `removeExtraLetter(currentWord, currentLetter.previousSibling)` is called to remove previous `<letter>`.
  - if `!currentLetter` then:
    - Class `current` is added to `currentWord.lastChild`.
    - Classes `incorrect` and `correct` are removed from `currentWord.lastChild`.
    - if `isExtraLetter(currentWord.lastChild)` then:
      - `removeExtraLetter(currentWord, currentWord.lastChild)` is called to remove extra `<letter>`.
  </details>

  <details>
  <summary><strong>updateLines(currentWord)</strong></summary>

  ***Function logic:***
  - if `currentWord?.getBoundingClientRect().top > 420` then:
    - `const words = document.getElementById('words')` is declared.
    - `const margin = parseInt(words.style.marginTop || '0px')` is declared.
    - `words.style.marginTop = (margin - 52) + 'px'` is used to scroll up hidden lines by one line.
  </details>

  <details>
  <summary><strong>updateCaret()</strong></summary>

  ***Variables:***
  - `nextLetter`.
  - `wordsContainer`
  - `nextWord`
  - `caret`
  - `containerRect`

  ***Function logic:***
  - if `nextLetter && caret && wordsContainer` then:
    - `const nextLetterRect = nextLetter.getBoundingClientRect()` is declared.
    - `caret.style.top = (nextLetterRect.top - containerRect.top) + 'px'` to change caret position vertically.
    - `caret.style.left = (nextLetterRect.left - containerRect.left) + 'px'` to change caret position horizontally
  - else:
    - `const nextWordRect = nextWord?.getBoundingClientRect()` is declared.
    - `caret.style.top = (nextWordRect?.top - containerRect.top) + 'px'` to change caret position vertically.
    - `caret.style.left = (nextWordRect?.right - containerRect.left) + 'px'` to change caret position horizontally.
  </details>

</details>

<details>
<summary><strong>index.js</strong></summary>

***Imports:***
- `import { displayWords } from './UI/display.js';`
- `import { handleTyping } from './UI/inputHandler.js'`
- `import { test } from './app/settings.js'`

***File logic:***
- document object is added a `'DOMContentLoaded'` event listener:
  - `displayWords()` is caleed.
  - `const wordsInputField = document.querySelector('#wordsInput')` is declared.
  - `wordsInputField.addEventListener('keyup', handleTyping);` is added so that inputField listen for every typed key when `wordsInputField` is focused.
  - `const wordsWrapper = document.querySelector('#wordsWrapper')` is declared.
  - `wordsWrapper` is added an event listener `'click'` which focuses `wordsInputField`.
  - `const resetButton = document.getElementById('resetTestButton')` is declared.
  - `resetButton` is added an event listener `'click'` which calls `test.reset()` on click.

</details>