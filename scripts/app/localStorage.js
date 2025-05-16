export default class LocalStorageHelper {

	static saveToLocalStorage(wpm, accuracy) {
		const currentTestResults = this.getCurrentTestResults();
		const bestTestResults = this.getBestTestResults();
		try {
			if (currentTestResults === null) {
				localStorage.setItem('Current', JSON.stringify({ wpm, accuracy }));
				localStorage.setItem('Best', JSON.stringify({ wpm, accuracy }));
			} else {
				localStorage.setItem('Previous', JSON.stringify(currentTestResults));

				if (bestTestResults.wpm < wpm && bestTestResults.accuracy <= accuracy) {
					console.log('New best test results');
					localStorage.setItem('Best', JSON.stringify({ wpm, accuracy }));
				}

				localStorage.setItem('Current', JSON.stringify({ wpm, accuracy }));
			}
		}
		catch (error) {
			console.error('Something wrong happened while saving to localStorage:', error);
		}
	}

	static getBestTestResults() {
		const bestTestResults = JSON.parse(localStorage.getItem('Best'));
		return bestTestResults ? bestTestResults : null;
	}

	static getPreviousTestResults() {
		const previousTestResults = JSON.parse(localStorage.getItem('Previous'));
		return previousTestResults ? previousTestResults : null;
	}

	static getCurrentTestResults() {
		const currentTestResults = JSON.parse(localStorage.getItem('Current'));
		return currentTestResults ? currentTestResults : null;
	}

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
