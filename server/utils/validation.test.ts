import { isRealString } from "./isRealString";
import expect from "expect";

describe("Is Real String", () => {
  it("Should reject non-string values", () => {});
  let res = isRealString(65);
  expect(isRealString(res)).toBe(false);
});

describe("Is Real String", () => {
  it("Should reject non-string values", () => {});
  let res = isRealString("          ");
  expect(isRealString(res)).toBe(false);
});

describe("Is Real String", () => {
  it("Should reject non-string values", () => {});
  let res = isRealString("    lfkd      ");
  expect(isRealString(res)).toBe(true);
});
