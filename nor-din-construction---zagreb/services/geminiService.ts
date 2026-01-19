
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getConstructionAdvice(query: string, lang: 'hr' | 'en') {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = lang === 'hr' 
      ? 'Ti si stručni savjetnik za gradnju u tvrtki Nor Din iz Zagreba. Odgovaraj na hrvatskom jeziku. Budi profesionalan, ljubazan i informativan.'
      : 'You are an expert construction advisor at Nor Din, a company in Zagreb. Respond in English. Be professional, polite, and informative.';

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("AI Service Error:", error);
      return lang === 'hr' ? "Žao mi je, trenutno nisam dostupan." : "I'm sorry, I am currently unavailable.";
    }
  }
}

export const geminiService = new GeminiService();
