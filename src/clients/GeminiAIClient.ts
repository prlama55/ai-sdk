import { AIRequest, AIResponse } from "../types";
import { BaseClient } from "./BaseClient";
import { GoogleGenAI } from "@google/genai";

export class GeminiAIClient extends BaseClient<GoogleGenAI> {
  protected aiClient: GoogleGenAI;
  constructor(private apiKey: string) {
    super();
    this.aiClient = new GoogleGenAI({ apiKey: this.apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const response = await this.aiClient.models.generateContent({
      model: request.modelId,
      contents: request.prompt
    });

    return response.text ?? "";
  }
}
