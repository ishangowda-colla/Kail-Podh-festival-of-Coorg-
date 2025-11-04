
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are a friendly and knowledgeable guide to the Kail Podh festival of the Kodava people in Coorg. Your name is 'Kail Podh'. Answer questions about its traditions, rituals, food, and cultural significance. Keep your answers engaging, informative, and concise. Your goal is to make the user feel like they are learning about a rich and vibrant culture.`;

let chat: Chat | null = null;

function initializeChat() {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}

export async function getBotResponse(message: string): Promise<string> {
  try {
    if (!chat) {
      initializeChat();
    }
    
    // The chat object is guaranteed to be non-null here
    const response = await (chat as Chat).sendMessage({ message });

    return response.text;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    initializeChat(); // Reset chat on error
    return "I seem to be having trouble connecting with the ancestral spirits right now. Please ask again in a moment.";
  }
}
