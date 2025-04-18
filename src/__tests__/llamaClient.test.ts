import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the LlamaClient class used internally by AIClient
vi.mock("../clients/LlamaClient", () => {
  return {
    LlamaClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({ text: "Mocked response" })
    }))
  };
});

describe("AIClient (unit, mocked LlamaClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      modelId: "meta-llama-3-8b-instruct",
      apiKey: "test-key",
      provider: "meta"
    });
  });

  it("should return mocked response from LlamaClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result.text).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        modelId: "nonexistent-model",
        apiKey: "test-key",
        provider: "meta"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
