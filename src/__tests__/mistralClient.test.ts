import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIClient } from "../index";

// Mock the MistralClient class used internally by AIClient
vi.mock("../clients/MistralClient", () => {
  return {
    MistralClient: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({ text: "Mocked response" })
    }))
  };
});

describe("AIClient (unit, mocked MistralClient)", () => {
  let client: AIClient;

  beforeEach(() => {
    client = new AIClient({
      modelId: "mistral-medium",
      apiKey: "test-key",
      provider: "mistral"
    });
  });

  it("should return mocked response from MistralClient", async () => {
    const result = await client.chat("Translate hello to French");
    expect(result.text).toBe("Mocked response");
  });

  it("should throw error for unsupported model", () => {
    expect(() => {
      new AIClient({
        modelId: "nonexistent-model",
        apiKey: "test-key",
        provider: "mistral"
      });
    }).toThrow("Unsupported model: nonexistent-model");
  });
});
