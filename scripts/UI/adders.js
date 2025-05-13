export function addClass(element, name) {
	element.className += ` ${name}`;
}

export function removeClass(element, name) {
	element.className = element.className.replace(name,'');
}

export function removeExtraLetter(word, child) {
  word.removeChild(child)
};

export function isExtraLetter(word, child) {
  return child.classList.contains('extra');
}