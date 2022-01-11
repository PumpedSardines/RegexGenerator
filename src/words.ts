import { Word } from "./types";

/**
 * Generates a escaped word from an input string
 * @param input the string to generate a word from
 */
export function generate(input: string): Word {
  // Some sequences of letters should be escaped in regex
  // Therefore start by escaping those sequences
  const softEsc = input
    .replace(/\\/g, "\\\\")
    .replace(/({\d+,\d*})/g, "\\$1")
    .replace(/({\d+})/g, "\\$1");

  // Split letters with escape the character in mind
  const splSoftEsc = softEsc
    .split(/(\\\\|\\{)?/g)
    // Split will add undefined in between all letters
    // Since regex split is included in the array
    // Therefore we filter them out
    .filter((v) => v);

  // Letters that should be escaped in regex except for \ since it was escaped in the previous step
  const escLetters = "[]?*+^$()";

  return {
    // Return with final escape characters pass
    letters: splSoftEsc.map((v) => {
      if (escLetters.includes(v)) {
        return "\\" + v;
      }
      return v;
    }),
  };
}

/**
 * Splits a word based on a index and returns two new words
 * @param word The word to split
 * @param index The index to split at
 */
export function splitIndex(word: Word, index: number): [Word, Word] {
  // Remove refrence from the word since modifies the original array
  const lettersExRef = word.letters.slice(0);

  if(index < 0) {
    index += lettersExRef.length;
  }

  const letters = lettersExRef.splice(0, index);

  return [
    {
      letters,
    },
    {
      letters: lettersExRef,
    },
  ];
}

/**
 * Sorts an array of words
 * @param input The words to sort
 * @param reverse If the sort should be with the last letter instead of the first
 */
export function sort(input: Word[], reverse = false) {
  const words: Word[] = JSON.parse(JSON.stringify(input));

  if(reverse) {
    return words.sort((a, b) => {
      const reverse = (a: string[]) => {
        return (JSON.parse(JSON.stringify(a)) as string[]).join("").split("").reverse().join("");
      };

      return reverse(a.letters).localeCompare(reverse(b.letters));
    });
  } else {
    return words.sort((a, b) => {
      return a.letters.join("").localeCompare(b.letters.join(""));
    });
  }
}