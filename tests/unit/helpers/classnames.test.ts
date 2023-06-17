// @ts-nocheck
import classnames from "../../../src/utils/classnames";

describe("classnames() should return proper string", () => {
  describe("should return single merged string", () => {
    test(`should combine multiple different strings into one`, () => {
      expect(classnames("c1 c2", "c3", "c4", "c5 c6 c7")).toBe(
        "c1 c2 c3 c4 c5 c6 c7"
      );
    });

    test(`should return passed single string itself`, () => {
      expect(classnames("c1")).toBe("c1");
    });

    test(`should compute logic and return merged string`, () => {
      expect(classnames("c1", true && "c2")).toBe("c1 c2");
    });

    test(`should coerce types and return merged string`, () => {
      expect(classnames(1, 2, 3, "c1", true)).toBe("1 2 3 c1 true");
    });
  });
});
