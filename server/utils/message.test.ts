import expect from "expect";
import { generateMessage } from "./message";

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from: string = "Mike",
      text = "Hello World as a demo message!",
      createdAt = new Date().getTime();
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
