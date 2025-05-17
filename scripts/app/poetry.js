const PoetryDBAPI = "https://poetrydb.org/random";
const maxWords = 250;

export class Poem {
  constructor(words) {
    this.words = words;

    this.cleanUpText();
  }

  cleanUpText() {
    let count = 0;
    const cleanedWords = [];

    for (const word of this.words) {
      let cleanedWord = '';
      for (const char of word) {
        if (RegExp(/[a-z]/).test(char)) {
          cleanedWord += char;
        }
      }

      if (cleanedWord === '') continue;
      cleanedWords.push(cleanedWord.toLowerCase());
      count++;

      if (count >= maxWords) break;
    }
    this.words = cleanedWords;

    const originalLength = this.words.length;
    if (this.words.length < maxWords) {
      for (let i = 0; i < maxWords - originalLength; i++) {
        this.words.push(this.words[i % this.words.length]);
      }
    }
  }
}


export async function getPoetryDBResponse() {
  try {
    const response = await fetch(PoetryDBAPI);
    const data = await response.json();
    const PoemObj = data[0];

    if (!PoemObj) {
      return false;
    }

    const words = [];

    PoemObj.lines.forEach(line => {
      line.split(/ +/).forEach(word => {
        words.push(word);
      });
    });

    return new Poem(words);
  } catch (e) {
    alert('Failed to fetch poetry data. Please try again later.');
    return false;
  }
}