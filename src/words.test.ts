import * as words from "./words";

describe("generate()", () => {
  describe("Correct serialization", () => {
    test.each([
      // Basic test
      [
        "test",
        {
          letters: ["t", "e", "s", "t"],
        },
      ],
      // Escapes escape character
      [
        "\\test",
        {
          letters: ["\\\\", "t", "e", "s", "t"],
        },
      ],
      // Escapes 2 escape character
      [
        "\\\\test",
        {
          letters: ["\\\\", "\\\\", "t", "e", "s", "t"],
        },
      ],
      // Escapes {2} and {2,} and {3,2}
      [
        "{2}a{2,}l{3,2}",
        {
          letters: [
            "\\{",
            "2",
            "}",
            "a",
            "\\{",
            "2",
            ",",
            "}",
            "l",
            "\\{",
            "3",
            ",",
            "2",
            "}",
          ],
        },
      ],
      // Escapes other regex characters
      [
        "?re[9*",
        {
          letters: ["\\?", "r", "e", "\\[", "9", "\\*"],
        },
      ],
    ] as const)("%p", (word, expected) => {
      expect(words.generate(word)).toMatchObject(expected);
    });
  });
});

describe("splitIndex()", () => {
  test("removes refrence", () => {
    const word = {
      letters: ["a", "b", "c"],
    };

    const [a, b] = words.splitIndex(word, 1);

    expect(word.letters).toMatchObject(["a", "b", "c"]);

    expect(a.letters).toMatchObject(["a"]);
    expect(b.letters).toMatchObject(["b", "c"]);
  });

  test("negative index", () => {

    const word = {
      letters: ["a", "b", "c"],
    };

    const [a, b] = words.splitIndex(word, -1);

    expect(word.letters).toMatchObject(["a", "b", "c"]);

    expect(a.letters).toMatchObject(["a", "b"]);
    expect(b.letters).toMatchObject(["c"]);

  });
});
