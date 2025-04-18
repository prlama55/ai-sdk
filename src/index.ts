import {
  OpenAIClient,
  GeminiAIClient,
  AnthropicClient,
  CohereClient,
  MistralClient,
  DeepSeekClient,
  LlamaClient,
  XAIClient,
  GenAIClient
} from "./clients";

import { aiModels, AIModel, AIResponse, AIRequest } from "./types";
import { ClientConfig } from "./types";

export class AIClient {
  private client: any;
  private model: AIModel;
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    const modelInfo = aiModels.find((m) => m.modelId === config.modelId);
    if (!modelInfo) throw new Error(`Unsupported model: ${config.modelId}`);

    this.model = modelInfo;
    this.config = config;

    switch (modelInfo.provider.toLowerCase()) {
      case "openai":
        this.client = new OpenAIClient(config.apiKey);
        break;
      case "anthropic":
        this.client = new AnthropicClient(config.apiKey);
        break;
      case "google":
        this.client = new GeminiAIClient(config.apiKey);
        break;
      case "cohere":
        this.client = new CohereClient(config.apiKey);
        break;
      case "meta":
      case "llama":
        this.client = new LlamaClient(config.apiKey);
        break;
      case "deepseek":
        this.client = new DeepSeekClient(config.apiKey);
        break;
      case "xai":
        this.client = new XAIClient(config.apiKey);
        break;
      case "mistral":
        this.client = new MistralClient(config.apiKey);
        break;
      case "custom":
        if (!config.baseURL)
          throw new Error("Base URL is required for custom provider");
        this.client = new GenAIClient(config);
        break;
      default:
        throw new Error(`Provider not yet supported: ${modelInfo.provider}`);
    }
  }

  async chat(prompt: string): Promise<AIResponse> {
    if (!this.client) {
      throw new Error("Client not initialized");
    }
    return await this.client.generate({
      modelId: this.model.modelId,
      maxTokens: this.config.maxTokens,
      temperature: this.config.temperature,
      prompt
    });
  }
}

export {
  OpenAIClient,
  GeminiAIClient,
  AnthropicClient,
  CohereClient,
  MistralClient,
  DeepSeekClient,
  LlamaClient,
  XAIClient,
  GenAIClient
};
export type { AIModel, ClientConfig, AIRequest, AIResponse };
export default AIClient;
