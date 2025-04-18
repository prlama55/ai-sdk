import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the DeepSeekClient class used internally by AIClient
vi.mock("../clients/DeepSeekClient", () => {
  return {
    DeepSeekClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({ text: "Mocked response" })
    }))
  };
});

describe("AIClient (unit, mocked DeepSeekClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      modelId: "deepseek-chat",
      apiKey: "test-key",
      provider: "deepseek"
    });
  });

  it("should return mocked response from DeepSeekClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result.text).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        modelId: "nonexistent-model",
        apiKey: "test-key",
        provider: "deepseek"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
