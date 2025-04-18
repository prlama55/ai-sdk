import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the AnthropicClient class used internally by AIClient
vi.mock("../clients/AnthropicClient", () => {
  return {
    AnthropicClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue("Mocked response")
    }))
  };
});

describe("AIClient (unit, mocked AnthropicClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      apiKey: "test-key",
      provider: "anthropic",
      modelId: "claude-3-opus-20240229"
    });
  });

  it("should return mocked response from AnthropicClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        apiKey: "test-key",
        provider: "anthropic",
        modelId: "nonexistent-model"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
