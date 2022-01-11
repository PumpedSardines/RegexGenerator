import chalk from "chalk";
import regexGenerator from "../src";

/**
 * Takes a input of words and prints the input and the regex output
 */
export function regexPrint(input: string[]) {
  const regex = regexGenerator(input);
  console.log(chalk.bold.yellow("== Input =="));
  console.log(JSON.stringify(input));
  console.log("");
  console.log(chalk.bold.blue("== Output =="));
  console.log(regex);
  console.log("");
}