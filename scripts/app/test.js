import LocalStorageHelper from './localStorage.js';
import { addClass } from '../UI/adders.js';
import { displayResults, resetTest, restartTest } from '../UI/display.js';

export default class Test {
	constructor() {
			this.gameTime = 60 * 1000;
			this.timer = null;
			this.gameStart = null;
			this.pauseTime = 0;
	}

	startTimer() {
			this.timer = setInterval(() => {
				if (!this.gameStart) {
					this.gameStart = (new Date()).getTime();
				}
				const currentTime = (new Date()).getTime();
				const msPassed = currentTime - this.gameStart;
				const sPassed = Math.round(msPassed / 1000);
				const sLeft = (this.gameTime / 1000) - sPassed;

				if (sLeft <= this.pauseTime) {
					this.endTest();
				}
				document.querySelector('.timeInNumbers').textContent = sLeft;
			}, 1000);
	};

	stopTimer() {
		clearInterval(this.timer);
		this.timer = null;
	}

	getWpm() {
		const wordsTypedCorrectly = [...document.querySelectorAll('.word.typed:not(.error)')];
  	return Math.round(wordsTypedCorrectly.length / this.gameTime * 60000);
	}

	getWordAccuracy() {
		const wordsTyped = [...document.querySelectorAll('.word.typed')];
		const wordsTypedCorrectly = [...document.querySelectorAll('.word.typed:not(.error)')];
		const accuracy = Math.round((wordsTypedCorrectly.length / wordsTyped.length) * 100);
		return isNaN(accuracy) ? 0 : accuracy;
	}

	endTest() {
		this.stopTimer();
		addClass(document.querySelector('#wordsWrapper', 'over'));
		const wpm = this.getWpm();
		const accuracy = this.getWordAccuracy();
		LocalStorageHelper.saveToLocalStorage(wpm, accuracy);
		displayResults(wpm, accuracy);
	}

	reset() {
		console.log('Resetting test...');
		this.stopTimer();
		this.gameStart = null;
		resetTest();
	}

	restart() {
		console.log('Restarting test...');
		this.stopTimer();
		this.gameStart = null;
		restartTest();
	}
}