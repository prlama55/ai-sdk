import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the XAI class used internally by AIClient
vi.mock("../clients/XAIClient", () => {
  return {
    XAIClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({ text: "Mocked response" })
    }))
  };
});

describe("AIClient (unit, mocked XAIClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      modelId: "grok-1",
      apiKey: "test-key",
      provider: "xai"
    });
  });

  it("should return mocked response from XAIClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result.text).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        modelId: "nonexistent-model",
        apiKey: "test-key",
        provider: "xai"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
