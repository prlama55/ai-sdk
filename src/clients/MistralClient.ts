import { BaseClient } from "./BaseClient";
import { Mistral } from "@mistralai/mistralai";
import { AIRequest, AIResponse } from "../types";
export class MistralClient extends BaseClient<Mistral> {
  protected aiClient: Mistral;
  constructor(private apiKey: string) {
    super();
    this.aiClient = new Mistral({
      apiKey: this.apiKey
    });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const chatResponse = await this.aiClient.chat.complete({
      model: request.modelId,
      messages: [{ role: "user", content: request.prompt }],
      temperature: request.temperature ?? 0.7,
      maxTokens: request.maxTokens ?? 256
    });

    return chatResponse.choices ?? [];
  }
}
