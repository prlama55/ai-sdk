import { ContentBlock } from "@anthropic-ai/sdk/resources";
import { AIModel, aiModels, Provider } from "./models";
import { Cohere } from "cohere-ai";
import { ChatCompletion } from "openai/resources/chat";
import { ChatCompletionChoice } from "@mistralai/mistralai/models/components";
export interface ClientConfig {
  modelId: string;
  apiKey: string;
  provider: Provider;
  baseURL?: string;
  maxTokens?: number;
  temperature?: number;
}
export interface AIRequest {
  modelId: string;
  prompt: string;
  [key: string]: any;
}

export type AIResponse =
  | ContentBlock
  | Cohere.AssistantMessageResponse
  | Array<ChatCompletion.Choice>
  | Array<ChatCompletionChoice>
  | string;

export interface AIClient {
  generate(request: AIRequest): Promise<AIResponse>;
}

export { aiModels, AIModel };
