import { blockBuilder } from "./block-builder";
import { regexGenerate } from "./regex-generate";
import * as words from "./words";

/**
 * Generates a valid regex string that matches words
 * @param words Words to match
 */
function regexGenerator(input: string[]) {
  // This method also functions as a santizer for the input
  // And some last tweaks that were'nt done in the recursive functions

  /*
    Tweaks that are made
    * blockBuilderForwards doesn't support empty strings so we fix that
    * Combines the output from regexGenerate
    * Changes words from a string[] into a Word[]
    * Edge case were only "" is provided
  */

  const isOptional = input.includes("");

  if (input.length === 1 && isOptional) {
    return "";
  }

  const sanitizedWords = input
    .filter((v) => v !== "")
    .map((v) => words.generate(v));

  const blocks = blockBuilder(sanitizedWords);

  const finalRegex = regexGenerate(blocks).join("|");

  // Mofiy if optional
  let regex = "";
  if (isOptional) {
    regex = `(${finalRegex})?`;
  } else {
    regex = finalRegex;
  }

  return regex;
}

export default regexGenerator;
