export default class LocalStorageHelper {

	// Save current and best test results to localStorage
	static saveToLocalStorage(wpm, accuracy) {
		const currentTestResults = this.getCurrentTestResults();
		const bestTestResults = this.getBestTestResults();
		try {
			if (currentTestResults === null) {
				// No current test results, set initial values
				localStorage.setItem('Current', JSON.stringify({ wpm, accuracy }));
				localStorage.setItem('Best', JSON.stringify({ wpm, accuracy }));
			} else {
				// Save current test results as previous
				localStorage.setItem('Previous', JSON.stringify(currentTestResults));

				// Update the best test results if the new ones are better
				if (bestTestResults.wpm < wpm && bestTestResults.accuracy <= accuracy) {
					console.log('New best test results');
					localStorage.setItem('Best', JSON.stringify({ wpm, accuracy }));
				}

				// Set new current test results
				localStorage.setItem('Current', JSON.stringify({ wpm, accuracy }));
			}
		}
		catch (error) {
			console.error('Something wrong happened while saving to localStorage:', error);
		}
	}

	// Get the best test results from localStorage
	static getBestTestResults() {
		const bestTestResults = JSON.parse(localStorage.getItem('Best'));
		return bestTestResults ? bestTestResults : null;
	}

	// Get the previous test results from localStorage
	static getPreviousTestResults() {
		const previousTestResults = JSON.parse(localStorage.getItem('Previous'));
		return previousTestResults ? previousTestResults : null;
	}

	// Get the current test results from localStorage
	static getCurrentTestResults() {
		const currentTestResults = JSON.parse(localStorage.getItem('Current'));
		return currentTestResults ? currentTestResults : null;
	}

	// Compare the WPM values of the previous and current tests
	static compareWpm() {
		const previousTestResults = this.getPreviousTestResults();
		const currentTestResults = this.getCurrentTestResults();

		if (previousTestResults && currentTestResults) {
			const previousWpm = previousTestResults.wpm;
			const currentWpm = currentTestResults.wpm;

			if (currentWpm === previousWpm) {
					return 'same';
			} else {
				return currentWpm > previousWpm ? 'better' : 'worse';
			}
		} else {
			return '-';
		}
	}

	// Compare the accuracy values of the previous and current tests
	static compareAccuracy() {
		const previousTestResults = this.getPreviousTestResults();
		const currentTestResults = this.getCurrentTestResults();

		if (previousTestResults && currentTestResults) {
			const previousAccuracy = previousTestResults.accuracy;
			const currentAccuracy = currentTestResults.accuracy;

			if (currentAccuracy === previousAccuracy) {
				return 'same';
			} else {
				return currentAccuracy > previousAccuracy ? 'better' : 'worse';
				}
			} else {
				return '-';
			}
	}
}
