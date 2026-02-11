
import { GoogleGenAI, Type } from "@google/genai";
import { ReviewRequest } from "../types";

export const generateReview = async (request: ReviewRequest): Promise<{ title: string; content: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const metricsDescription = Object.entries(request.metrics)
    .map(([id, status]) => `${id}: ${status}`)
    .join(', ');

  const prompt = `
    Generate a realistic, high-quality customer review for a business with the following details:
    - Business Name: ${request.businessName}
    - Rating: ${request.rating} out of 5 stars
    - Desired Tone: ${request.tone}
    - Metric Performance: ${metricsDescription}
    - Additional User Context: ${request.additionalDetails || 'None provided'}

    Instructions:
    1. Write a compelling, realistic headline/title for the review.
    2. Write the body of the review. It should sound human and incorporate the specific metrics mentioned.
    3. Ensure the tone matches "${request.tone}".
    4. If the rating is low, ensure the tone is appropriately critical or constructive.
    5. If the rating is high, make it sound genuinely pleased.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for the review" },
            content: { type: Type.STRING, description: "The full body text of the review" },
          },
          required: ["title", "content"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return {
      title: result.title || "My Review",
      content: result.content || "No content generated.",
    };
  } catch (error) {
    console.error("Error generating review:", error);
    throw new Error("Failed to generate review. Please try again.");
  }
};
