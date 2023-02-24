
import { validateSubject } from "./validation"

describe("Test valid scenarions with validateSubject", () => {
  const validSubject = "I've been a bit naughty!";
  test("When a valid subject is passed then no error message is returned", () =>  {
    expect(validateSubject(validSubject)).toBeUndefined();
  });
});

describe("Test valid scenarios with validateSubject", () => {
  const invalidSubject = "";
  const tooLongSubject = "I've been just a tiny bit naughty!";
  test("When a valid subject is passed then no error message is returned", () =>  {
    expect(validateSubject(invalidSubject)).toEqual("🚫Subject Must have length between 1 and 25");
  });
  test("When a valid subject is passed then no error message is returned", () =>  {
    expect(validateSubject(tooLongSubject)).toEqual("🚫Subject Must have length between 1 and 25");
  });  
});