import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the OpenAIClient class used internally by AIClient
vi.mock("../clients/OpenAIClient", () => {
  return {
    OpenAIClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({ text: "Mocked response" })
    }))
  };
});

describe("AIClient (unit, mocked OpenAIClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      modelId: "gpt-4",
      apiKey: "test-key",
      provider: "openai"
    });
  });

  it("should return mocked response from OpenAIClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result.text).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        modelId: "nonexistent-model",
        apiKey: "test-key",
        provider: "openai"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
