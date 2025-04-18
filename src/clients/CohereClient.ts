import { BaseClient } from "./BaseClient";
import { AIRequest, AIResponse } from "../types";
import { CohereClientV2 } from "cohere-ai";

export class CohereClient extends BaseClient<CohereClientV2> {
  protected aiClient: CohereClientV2;
  constructor(private apiKey: string) {
    super();
    this.aiClient = new CohereClientV2({
      token: this.apiKey
    });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const response = await this.aiClient.chat({
      model: request.modelId,
      messages: [{ role: "user", content: request.prompt }],
      temperature: request.temperature ?? 0.7,
      maxTokens: request.maxTokens ?? 256
    });

    return response.message;
  }
}
