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

    **Instance variable/methods**

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
<summary><strong>adders.js</strong></summary>

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
