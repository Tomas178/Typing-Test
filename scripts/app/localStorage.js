export function saveToLocalStorage(wpm, accuracy) {
	const currentTestResults = getCurrentTestResults();
	const bestTestResults = getBestTestResults();
	if (currentTestResults === null) {
		localStorage.setItem('Current', JSON.stringify({ wpm, accuracy }));
		localStorage.setItem('Best', JSON.stringify({ wpm, accuracy}))
	} else {
		localStorage.setItem('Previous', JSON.stringify(currentTestResults));

		// accuracy cant be greater than 100 therefore, we check its value with '<='
		if (bestTestResults.wpm < wpm && bestTestResults.accuracy <= accuracy) {
			console.log('New best test results');
			localStorage.setItem('Best', JSON.stringify({ wpm, accuracy}));
		}

		localStorage.setItem('Current', JSON.stringify({ wpm, accuracy }));
	}
}

export function getBestTestResults() {
	const bestTestResults = JSON.parse(localStorage.getItem('Best'));
	if (bestTestResults) {
		return bestTestResults;
	} else {
		return null;
	}
}

export function getPreviousTestResults() {
	const previousTestResults = JSON.parse(localStorage.getItem('Previous'));
	if (previousTestResults) {
		return previousTestResults;
	} else {
		return null;
	}
}

export function getCurrentTestResults() {
	const currentTestResults = JSON.parse(localStorage.getItem('Current'));
	if (currentTestResults) {
		return currentTestResults;
	} else {
		return null;
	}
}

export function compareWpm() {
	const previousTestResults = getPreviousTestResults();
	const currentTestResults = getCurrentTestResults();
	if (previousTestResults && currentTestResults) {
		const previousWpm = previousTestResults.wpm;
		const currentWpm = currentTestResults.wpm;
		if (currentWpm === previousWpm) {
			return 'same';
		} else {
		return currentWpm > previousWpm ? 'better' : 'worse';
		}
	}
	else {
		return '-';
	}
}

export function compareAccuracy() {
	const previousTestResults = getPreviousTestResults();
	const currentTestResults = getCurrentTestResults();
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