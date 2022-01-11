export enum BlockDirection {
  Forwards,
  Backwards
}

/**
 * Symbolizes a letter with possible branching letter pairs
 */
export type Block = {
  letter: string;
  optional: boolean;
  evaluate: BlockDirection,
  blocks: Block[];
};

/**
 * A word with escaped regex letters
 */
export type Word = {
  letters: string[];
};
