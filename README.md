# AI Model Client SDK

A unified TypeScript/JavaScript SDK for interacting with multiple AI model providers, including OpenAI, Anthropic, Cohere, Gemini, Mistral, DeepSeek, Llama, and XAI. This SDK provides a consistent interface for generating text and working with various AI models, making it easy to integrate state-of-the-art language models into your applications.

## Features

- Unified API for multiple AI providers
- Easy switching between models and providers
- TypeScript support with rich typings
- Extensible and customizable
- Supports custom system prompts, temperature, max tokens, and more

## Installation

```bash
npm install @craftily/ai-sdk
# or
yarn add @craftily/ai-sdk
```
## Usage: General AIClient

> **Note:** The value of `response` returned by `client.chat(...)` depends on the provider. It may be a string, or it may be an object (e.g., with a `.text` property or other fields).

```typescript
import AIClient from '@craftily/ai-sdk';

const client = new AIClient({
  modelId: 'gpt-4.1', // or any supported modelId
  provider: 'openai', // "openai", "google", "anthropic", "cohere", "meta", "mistral", "xai", "deepseek", "custom",
  apiKey: 'YOUR_API_KEY',
  maxTokens: 256,      // optional
  temperature: 0.7,    // optional
});

const response = await client.chat("What are the top tourist attractions in Tokyo, Japan?");

// Handle both string and object responses
if (typeof response === 'string') {
  console.log(response);
} else if (response && typeof response === 'object' && 'text' in response) {
  console.log(response.text);
} else {
  console.log(response); // fallback for other shapes
}
```

## Usage Individual Clients

```typescript
import { OpenAIClient, AnthropicClient, CohereClient /*, ... */ } from '@craftily/ai-sdk';
import { AIRequest } from '@craftily/ai-sdk';

// Example: Using OpenAIClient
const client = new OpenAIClient({ apiKey: 'YOUR_OPENAI_API_KEY' });

const request: AIRequest = {
  prompt: "What are the top tourist attractions in Tokyo, Japan?",
  modelId: "gpt-4.1", // or any supported model
  temperature: 0.7,
  maxTokens: 256,
};

const response = await client.generate(request);

// Handle both string and object responses
if (typeof response === 'string') {
  console.log(response);
} else if (response && typeof response === 'object' && 'text' in response) {
  console.log(response.text);
} else {
  console.log(response); // fallback for other shapes
}
```

This approach allows you to switch between providers and models dynamically by changing the `modelId` and `provider` in the configuration.
## Supported Providers & Models

- **OpenAI**: GPT-4, GPT-3.5, etc.
- **Anthropic**: Claude models
- **Cohere**: Command models
- **Google Gemini**: Gemini models
- **Mistral**: Mistral models
- **DeepSeek**: DeepSeek models
- **Llama**: Llama models
- **XAI**: XAI models

## API Reference

### AIRequest

| Field         | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| prompt        | string   | The prompt/question for the model              |
| modelId       | string   | The model identifier (see supported models)    |
| temperature   | number   | (Optional) Sampling temperature                |
| maxTokens     | number   | (Optional) Maximum tokens in the response      |

### Client Classes

Each provider has its own client class (e.g., `OpenAIClient`, `AnthropicClient`, etc.), all exposing a `.generate(request: AIRequest)` method that returns an AIResponse.

### AIResponse

| Field         | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| text          | string   | The generated text            |
| ...           | ...      | Other provider-specific fields |

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT