export type ModelCategory =
  | "general"
  | "translation"
  | "code"
  | "multimodal"
  | "search";

export type Provider =
  | "openai"
  | "google"
  | "anthropic"
  | "cohere"
  | "meta"
  | "mistral"
  | "xai"
  | "deepseek"
  | "custom";

export interface AIModel {
  name: string;
  provider: Provider;
  modelId: string;
  category: ModelCategory[];
  supportsToolUse?: boolean;
  isOpenSource?: boolean;
}

export const aiModels: AIModel[] = [
  // General-purpose chat models
  {
    name: "GPT-4",
    provider: "openai",
    modelId: "gpt-4",
    category: ["general", "translation", "code", "multimodal"],
    supportsToolUse: true
  },
  {
    name: "GPT-4 Turbo",
    provider: "openai",
    modelId: "gpt-4-turbo",
    category: ["general", "translation", "code", "multimodal"],
    supportsToolUse: true
  },
  {
    name: "GPT-3.5 Turbo",
    provider: "openai",
    modelId: "gpt-3.5-turbo",
    category: ["general"],
    supportsToolUse: true
  },
  {
    name: "Claude 3 Opus",
    provider: "anthropic",
    modelId: "claude-3-opus-20240229",
    category: ["general", "translation", "multimodal"],
    supportsToolUse: true
  },
  {
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    modelId: "claude-3-sonnet-20240229",
    category: ["general", "translation"],
    supportsToolUse: true
  },
  {
    name: "Claude 3 Haiku",
    provider: "anthropic",
    modelId: "claude-3-haiku-20240307",
    category: ["general"],
    supportsToolUse: true
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "google",
    modelId: "gemini-1.5-pro-latest",
    category: ["general", "translation", "multimodal"],
    supportsToolUse: true
  },
  {
    name: "Gemini 1.5 Flash",
    provider: "google",
    modelId: "gemini-1.5-flash-latest",
    category: ["general", "translation"],
    supportsToolUse: true
  },
  {
    name: "Command R+",
    provider: "cohere",
    modelId: "command-r-plus",
    category: ["general", "code", "search"],
    supportsToolUse: true
  },
  {
    name: "LLaMA 3 (8B)",
    provider: "meta",
    modelId: "meta-llama-3-8b-instruct",
    category: ["general"],
    isOpenSource: true
  },
  {
    name: "LLaMA 3 (70B)",
    provider: "meta",
    modelId: "meta-llama-3-70b-instruct",
    category: ["general"],
    isOpenSource: true
  },
  {
    name: "Mistral Medium",
    provider: "mistral",
    modelId: "mistral-medium",
    category: ["general"],
    isOpenSource: true
  },
  {
    name: "Grok-1",
    provider: "xai",
    modelId: "grok-1",
    category: ["general"]
  },
  {
    name: "DeepSeek Chat",
    provider: "deepseek",
    modelId: "deepseek-chat",
    category: ["general", "translation"]
  },

  // Translation-specific models
  {
    name: "Meta M2M-100",
    provider: "meta",
    modelId: "facebook/m2m100-1.2B",
    category: ["translation"],
    isOpenSource: true
  },

  // Multimodal
  {
    name: "GPT-4 Vision",
    provider: "openai",
    modelId: "gpt-4-vision-preview",
    category: ["multimodal"]
  },
  {
    name: "Claude 3 Opus (Vision)",
    provider: "anthropic",
    modelId: "claude-3-opus-20240229",
    category: ["multimodal"]
  }
];
