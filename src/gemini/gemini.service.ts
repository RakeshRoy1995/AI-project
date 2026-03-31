// gemini.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private client: GoogleGenerativeAI;

  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  async generate(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({
      model: 'gemini-2.5-flash', // fast & cheap
    });

    const result = await model.generateContent(prompt);

    return result.response.text();
  }
}