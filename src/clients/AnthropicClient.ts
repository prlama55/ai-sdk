import { BaseClient } from "./BaseClient";
import { AIRequest, AIResponse } from "../types";
import { Anthropic } from "@anthropic-ai/sdk";

export class AnthropicClient extends BaseClient<Anthropic> {
  protected aiClient: Anthropic;
  constructor(private apiKey: string) {
    super();
    this.aiClient = new Anthropic({
      apiKey: this.apiKey
    });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const { content } = await this.aiClient.messages.create({
      model: request.modelId,
      max_tokens: 1000,
      temperature: 1,
      system: "Respond only with short poems.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: request.prompt
            }
          ]
        }
      ]
    });
    return content[0];
  }
}
