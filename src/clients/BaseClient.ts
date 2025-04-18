import { AIRequest, AIResponse } from "../types";

export abstract class BaseClient<T> {
  protected abstract aiClient: T;
  abstract generate(request: AIRequest): Promise<AIResponse>;
}
