
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const QUIZ_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The quiz question.",
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of 4 possible answers.",
      },
      correctAnswerIndex: {
        type: Type.INTEGER,
        description: "The 0-based index of the correct answer in the 'options' array.",
      },
      explanation: {
        type: Type.STRING,
        description: "A brief explanation of why the correct answer is right.",
      },
    },
    required: ["question", "options", "correctAnswerIndex", "explanation"],
  },
};

export const generateQuizQuestions = async (topic: string, difficulty: Difficulty): Promise<QuizQuestion[]> => {
  try {
    const prompt = `
      You are an expert educator and quiz creator specializing in computer science and programming.
      Generate 5 multiple-choice quiz questions on the topic of "${topic}".
      The questions should be at a "${difficulty}" level.
      Each question must have exactly 4 options.
      One option must be correct.
      Provide a brief explanation for why the correct answer is right.
      Ensure the 'correctAnswerIndex' is a number between 0 and 3.
      Return the data in a valid JSON array format according to the provided schema. Do not include any markdown formatting like \`\`\`json.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: QUIZ_SCHEMA,
        temperature: difficulty === Difficulty.Beginner ? 0.4 : (difficulty === Difficulty.Intermediate ? 0.6 : 0.8),
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);
    
    // Basic validation
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("API returned an invalid or empty question set.");
    }
    
    return questions as QuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz questions. The topic might be too specific or there was an API issue. Please try again.");
  }
};
