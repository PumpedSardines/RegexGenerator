import { Block, BlockDirection } from "./types";

/**
 * Takes in blocks and the outputs an array of regex string for the blocks
 * @param blocks Blocks to generate regex on
 */
export function regexGenerate(blocks: Block[]): string[] {
  const returnRegexStrs = [];

  for (const block of blocks) {
    if (block.blocks.length === 0) {
      // No deeper blocks
      // This is a single letter, add it and continue
      returnRegexStrs.push(block.letter);
      continue;
    }

    // Get the deeper blocks
    const regexStrs = regexGenerate(block.blocks);

    // Evaluate the regex string and push it
    returnRegexStrs.push(generateRegex(block, regexStrs));
  }

  return returnRegexStrs;
}

/**
 * Generates a valid regex that matches one block and the later evaluated blocks
 * @param block The block to run
 * @param regexStrs The already evaluated previous blocks
 */
function generateRegex(block: Block, regexStrs: string[]) {
  if (regexStrs.length === 0 && block.optional) {
    throw new Error("A empty block can't be optional");
  }

  if (regexStrs.length === 0) {
    return block.letter;
  }

  if (block.evaluate === BlockDirection.Forwards) {
    if (regexStrs.length === 1 && block.optional) {
      const regexStr = regexStrs[0];

      if (regexStr.length === 1) {
        // If the a optional string is length 1
        // Only a question mark is required
        return `${block.letter}${regexStr}?`;
      } else {
        // Otherwise we need to wrap it in ()
        return `${block.letter}(${regexStr})?`;
      }
    }

    if (regexStrs.length === 1) {
      return `${block.letter + regexStrs[0]}`;
    }

    if (block.optional) {
      return `${block.letter}(${regexStrs.join("|")})?`;
    }

    return `${block.letter}(${regexStrs.join("|")})`;
  } else {
    if (regexStrs.length === 1 && block.optional) {
      const regexStr = regexStrs[0];

      if (regexStr.length === 1) {
        // If the a optional string is length 1
        // Only a question mark is required
        return `${regexStr}?${block.letter}`;
      } else {
        // Otherwise we need to wrap it in ()
        return `(${regexStr})?${block.letter}`;
      }
    }

    if (regexStrs.length === 1) {
      return `${regexStrs[0] + block.letter}`;
    }

    if (block.optional) {
      return `(${regexStrs.join("|")})?${block.letter}`;
    }

    return `(${regexStrs.join("|")})${block.letter}`;
  }
}
