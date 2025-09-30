import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  // Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines,
  // and remove the unnecessary check for the key's existence.
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}


export const getMovieSummary = async (movieTitle: string): Promise<string> => {
  if (!ai) {
    return "AI service is not available.";
  }
  try {
    const prompt = `Generate a creative and exciting one-sentence summary or a fun, little-known fact about the movie titled "${movieTitle}". Make it sound like a teaser.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not generate a summary at this time.";
  }
};
