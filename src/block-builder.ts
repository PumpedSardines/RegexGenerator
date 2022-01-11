import { Block, BlockDirection, Word } from "./types";
import * as words from "./words";

/**
 * Returns a block representation of given words that later can be transformed into regex that should be evaluate forwards.
 * * Assumes: No word is an empty string
 * * Assumes: All words are sorted in alphabetical order
 * @param input Words to generate blocks from
 */
function blockBuilderWithDirection(
  input: Word[],
  direction: BlockDirection
): Block[] {
  // If the call was called with an empty input
  // Return an empty block
  if (input.length === 0) {
    return [];
  }

  // Blocks to return
  const retBlocks: Block[] = [];

  // The current letter that is being evaluated
  let letter: null | string = null;
  // Current words that should be added for a given letter
  let curWords: Word[] = [];
  // Weather this current letter combination could be last one
  let isOptional = false;

  for (const word of input) {
    // Get the first/last letter and the rest of the word
    const [first, rest] = ((): [Word, Word] => {
      // A simple IIFE to get the first letter in case of forwards
      // and last letter in case of backwards
      if (direction === BlockDirection.Forwards) {
        return words.splitIndex(word, 1);
      } else {
        const [rest, last] = words.splitIndex(word, -1);

        return [last, rest];
      }
    })();

    // For ease of access later
    const curLetter = first.letters.join("");

    // Start the loop by setting the correct letter
    if (letter === null) {
      letter = curLetter;
    }

    if (letter !== curLetter) {
      // In this case we've added all words that start with "letter"
      // Since input is sorted alphabetically

      const curWordsExEmpty = curWords.filter((v) => v.letters.length !== 0);

      const blocks = blockBuilder(curWordsExEmpty, direction);

      retBlocks.push({
        letter,
        // The last letter can never be optional
        // Since optional indicates that the next set of letters are optional
        optional: isOptional && !!curWordsExEmpty.length,
        evaluate: direction,
        blocks: blocks,
      });

      // Reset state and move on to the next letter
      isOptional = false;
      letter = curLetter;
      curWords = [];
    }

    // This can possibly fall trough the above statement
    if (curLetter === letter) {
      // This means that this word should be added to all words that start with "letter"
      if (rest.letters.length === 0) {
        // If rest is length zero
        // Them one possibility is the next given string
        // Should be nonexistent, therefore optional
        isOptional = true;
      }
      curWords.push(rest);
    }
  }

  // The last pass of letter that never was added since a new letter didn't come
  if (letter === null) {
    // This should never execute if the for loop ran
    throw new Error("Encountered null as letter, can't continue") as never;
  }

  const curWordsExEmpty = curWords.filter((v) => v.letters.length !== 0);

  const blocks = blockBuilder(curWordsExEmpty, direction);

  retBlocks.push({
    letter,
    // The last letter can never be optional
    // Since optional indicates that the next set of letters are optional
    optional: isOptional && !!curWordsExEmpty.length,
    evaluate: direction,
    blocks: blocks,
  });

  return retBlocks;
}

/**
 * Determines direction to evaluate from
 * @param input Words to evaluate
 */
function createDetermineDirection(input: Word[], previous?: BlockDirection) {
  const backwardMap: Record<string, number> = {};
  const forwardMap: Record<string, number> = {};

  for (const word of input) {
    const firstLetter = word.letters[0];
    const lastLetter = word.letters[word.letters.length - 1];

    if (!(firstLetter in forwardMap)) {
      forwardMap[firstLetter] = 0;
    }

    if (!(lastLetter in backwardMap)) {
      backwardMap[lastLetter] = 0;
    }

    forwardMap[firstLetter]++;
    backwardMap[lastLetter]++;
  }

  return (word: Word) => {
    const forwardScore = forwardMap[word.letters[0]];
    const backwardScore = backwardMap[word.letters[word.letters.length - 1]];

    if (backwardScore === forwardScore && previous !== undefined) {
      return previous;
    }

    if (forwardScore < backwardScore) {
      return BlockDirection.Backwards;
    } else {
      return BlockDirection.Forwards;
    }
  };
}

/**
 * Returns a block representation of given words that later can be transformed into regex.
 * * Assumes: No word is an empty string
 * * Assumes: All words are sorted in alphabetical order
 * @param input Words to generate blocks from
 */
export function blockBuilder(
  input: Word[],
  previous?: BlockDirection
): Block[] {
  const determineDirection = createDetermineDirection(input, previous);

  const backInput = [];
  const forwardInput = [];

  for (const word of input) {
    if (determineDirection(word) === BlockDirection.Backwards) {
      backInput.push(word);
    } else {
      forwardInput.push(word);
    }
  }

  const sortedForward = words.sort(forwardInput);
  const sortedBackward = words.sort(backInput, true);

  const blocks = [
    ...blockBuilderWithDirection(sortedForward, BlockDirection.Forwards),
    ...blockBuilderWithDirection(sortedBackward, BlockDirection.Backwards),
  ];

  return blocks;
}
