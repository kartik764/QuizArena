import { GoogleGenAI } from "@google/genai";
import dotenv, { parse } from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 1. Build the prompt
function buildPrompt({ category, difficulty, questionCount }) {
  return `
    Generate exactly ${questionCount} multiple-choice quiz questions.

    Category: ${category}
    Difficulty: ${difficulty}

    Rules:
    - Exactly 4 options.
    - Exactly 1 correct answer.
    - Do not repeat questions.
    - Return ONLY valid JSON.

    Format:

    [
      {
        "question": "",
        "options": ["", "", "", ""],
        "correctAnswer": ""
      }
    ]
    `;
}

// 2. Call Gemini
async function callGemini(prompt) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.log(`Attempt ${attempt} failed.`);

      if (attempt === 3) {
        throw new Error(
          `Failed to generate questions after 3 attempts: ${error.message}`,
        );
      }
    }
  }
}

// 3. Parse JSON
function parseQuestions(responseText) {
  return JSON.parse(responseText);
}

// 4. Validate Questions
function validateQuestions(questions, questionCount) {
  if (!Array.isArray(questions)) {
    throw new Error("Questions must be an array.");
  }

  if (questions.length !== questionCount) {
    throw new Error("Incorrect number of questions.");
  }

  questions.forEach((question) => {
    if (!question.question) {
      throw new Error("Question text is missing.");
    }

    if (!Array.isArray(question.options)) {
      throw new Error("Options must be an array.");
    }

    if (question.options.length !== 4) {
      throw new Error("Each question must have exactly 4 options.");
    }

    if (!question.correctAnswer) {
      throw new Error("Correct answer is missing.");
    }

    if (!question.options.includes(question.correctAnswer)) {
      throw new Error("Correct answer must exist in options.");
    }
  });
}

// 5. Add Question Ids
function addQuestionIds(questions) {
  return questions.map((question, index) => ({
    id: index + 1,
    ...question,
  }));
}

// 6. Generate Questions
export async function generateQuestions({
  category,
  difficulty,
  questionCount,
}) {
  const prompt = buildPrompt({
    category,
    difficulty,
    questionCount,
  });

  const responseText = await callGemini(prompt);

  const questions = parseQuestions(responseText);

  validateQuestions(questions, questionCount);

  return addQuestionIds(questions);
}
