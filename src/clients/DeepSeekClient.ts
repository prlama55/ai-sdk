import { AIRequest, AIResponse } from "../types";
import { BaseClient } from "./BaseClient";
import OpenAI from "openai";

export class DeepSeekClient extends BaseClient<OpenAI> {
  protected aiClient: OpenAI;
  constructor(private apiKey: string) {
    super();
    this.aiClient = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: this.apiKey
    });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await this.aiClient.chat.completions.create({
      model: request.modelId,
      messages: [{ role: "user", content: request.prompt }],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 256
    });

    return res.choices;
  }
}
