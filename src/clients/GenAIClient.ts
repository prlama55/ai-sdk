import axios, { AxiosInstance } from "axios";
import { BaseClient } from "./BaseClient";
import { ClientConfig, AIRequest, AIResponse } from "../types";
export class GenAIClient extends BaseClient<AxiosInstance> {
  protected aiClient: AxiosInstance;
  constructor(config: ClientConfig) {
    super();
    this.aiClient = axios.create({
      baseURL: config.baseURL,
      headers: {
        Authorization: `Bearer ${config.apiKey}`
      }
    });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await this.aiClient.post("/chat/completions", {
      model: request.modelId,
      messages: [{ role: "user", content: request.prompt }],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 256
    });

    return res.data;
  }
}
