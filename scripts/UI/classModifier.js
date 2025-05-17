export function addClass(element, name) {
	element.classList.add(name);
}

export function removeClass(element, name) {
	element.classList.remove(name);
}

export function removeExtraLetter(word, letter) {
  word.removeChild(letter)
};

export function isExtraLetter(letter) {
  return letter.classList.contains('extra');
}

export function removeAllClassesFromComparisonCell(comparisonCell) {
  removeClass(comparisonCell, 'better');
  removeClass(comparisonCell, 'worse');
  removeClass(comparisonCell, 'same');
}

export function removeAllClassesFromWord(word) {
  removeClass(word, 'typed');
  removeClass(word, 'error');
  removeClass(word, 'current');
}

export function updateFirstWordFirstLetter() {
  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('letter'), 'current');
}