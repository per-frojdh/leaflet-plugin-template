/**
 * Tests described in this file should test internal functionality immediately, such as
 * verifying validations and other internal stuff.
 *
 * Should be testing source-code and not the final compiled code.
 */

import {} from "jest";

import API from "../src/api";
import CaseValidator from "../src/validator/caseValidator";
import {
  isNumber,
  isFloat,
  isEmail,
  inRange,
  isEmptyObject
} from '../src/validator/validator';
import {
  stringOfLength
} from '../src/util/string';

describe("CaseValidator Tests", () => {
  it("setName will fail validation", () => {
    const str = stringOfLength(65);
    let result = CaseValidator.validateName(str);

    expect(result).not.toBe(undefined);
    expect(result.errors).not.toBe(undefined);
    expect(result.errors.length).toBeGreaterThan(0);

    // We expect to fail the length requirement, but not type.
    expect(result.errors.length).toBe(1);
    expect(result.success).toBe(false);
  });

  it("setName will pass validation", () => {
    const str = stringOfLength(24);
    let result = CaseValidator.validateName(str);

    expect(result).not.toBe(undefined);
    expect(result.errors).not.toBe(undefined);
    expect(result.errors.length).toBe(0);
    expect(result.success).toBe(true);
  })

  it("setExcavationDepth will fail validation", () => {
    const str = "Foo";
    let result = CaseValidator.validateExcavationDepth(str);

    expect(result).not.toBe(undefined);
    expect(result.errors).not.toBe(undefined);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.success).toBe(false);
  })

});

describe("Validator tests", () => {
  it("Can validate number", () => {
    const str = "One";
    expect(isNumber(str)).toBe(false);

    let num = 1;
    expect(isNumber(num)).toBe(true);

    num = -1;
    expect(isNumber(num)).toBe(true);
  })

  it("Can validate float", () => {
    let float = 1.5;
    expect(isFloat(float)).toBe(true);

    float = -1.5;
    expect(isFloat(float)).toBe(true);

    float = 1;
    expect(isFloat(float)).toBe(false);
  })

  it("Can check for emails", () => {
    let email = "a@valid.email";
    expect(isEmail(email)).toBe(true);

    email = "notanemail@";
    expect(isEmail(email)).toBe(false);
  })

  it("Can check for in range", () =>  {
    let x: number = 5;
    let start: number = 1;
    let end: number = 10;

    expect(inRange(x, start, end)).toBe(true);

    x = 11;
    expect(inRange(x, start, end)).toBe(false);
  })
});

describe("API Tests", () => {
  it("Should be able to communicate", async () => {
    const result = await API.get();
    expect(result).toBe("le success");
  });
});
