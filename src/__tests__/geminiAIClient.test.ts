import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the GeminiAIClient class used internally by AIClient
vi.mock("../clients/GeminiAIClient", () => {
  return {
    GeminiAIClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue("Mocked response")
    }))
  };
});

describe("AIClient (unit, mocked GeminiAIClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      apiKey: "test-key",
      provider: "google",
      modelId: "gemini-1.5-pro-latest"
    });
  });

  it("should return mocked response from GeminiAIClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        apiKey: "test-key",
        provider: "google",
        modelId: "nonexistent-model"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
