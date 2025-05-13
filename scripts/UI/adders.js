export function addClass(element, name) {
	element.className += ` ${name}`;
}

export function removeClass(element, name) {
	element.className = element.className.replace(name,'');
}

export function removeExtraLetter(word, letter) {
  word.removeChild(letter)
};

export function isExtraLetter(letter) {
  return letter.classList.contains('extra');
}