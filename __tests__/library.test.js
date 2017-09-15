/**
 * Tests described in this file should consume the final distributed version of the library
 * and should not be testing internal logic (separately), but only the immediately
 * exported library functionality.
 */
const CaseCreator = require('../dist/caseCreator');

describe("CaseCreator Tests", () => {
  let cc;

  it("CaseCreator is instantiable", () => {
    expect(new CaseCreator()).toBeInstanceOf(CaseCreator);
  });

  it("Can create instance and set name", () => {
    const str = "Bob";
    const self = new CaseCreator({
      debug: true
    });
    self.setName(str);
    cc = self;

    expect(self.getName()).toBe(str);
  });

  it("Can set excavation depth", () => {
    const str = "Bob";
    cc.setExcavationDepth(str);

    expect(cc.getExcavationDepth()).toBe(str);
  });

  it("Can serialize object", () => {
    console.log(cc.serialize());
  })
});
