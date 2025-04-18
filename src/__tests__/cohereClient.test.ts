import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the CohereClient class used internally by AIClient
vi.mock("../clients/CohereClient", () => {
  return {
    CohereClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({ text: "Mocked response" })
    }))
  };
});

describe("AIClient (unit, mocked CohereClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      modelId: "command-r-plus",
      apiKey: "test-key",
      provider: "cohere"
    });
  });

  it("should return mocked response from CohereClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result.text).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        modelId: "nonexistent-model",
        apiKey: "test-key",
        provider: "cohere"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
