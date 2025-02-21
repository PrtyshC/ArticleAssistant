import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('api')
export class ChatbotController {
  private apiKey = "Enter a valid Gemini API Key"; 

  @Post('chat')
  async chat(@Body() body: { text: string; context: string }) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

      const requestBody = {
        systemInstruction: {
          parts: [
            {
              text: `You are an AI assistant that strictly answers questions based on the given article.
              - NEVER ask the user a question in return. ONLY answer.
              - If the article provides reasoning, answer "why" questions in detail.
              - If the article does NOT contain the answer, respond ONLY with: "The article does not mention this."
              - DO NOT repeat the question.
              - DO NOT invent answers.
              - Keep responses concise and informative.`,
            },
          ],
        },
        contents: [
          {
            parts: [
              { text: `### ARTICLE CONTEXT:\n${body.context}` },
              { text: `### USER QUESTION:\n${body.text}` },
              { text: `### TASK: Answer the question based ONLY on the article. If no answer is found, say: "The article does not mention this."` },
            ],
          },
        ],
      };

      const response = await axios.post(endpoint, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
        console.error('Unexpected API Response:', response.data);
        return { error: 'No valid response from AI model.' };
      }

      const answer = response.data.candidates[0]?.content?.parts?.[0]?.text || 'No answer found.';
      return { answer };
    } catch (error) {
      console.error('Error in Chatbot:', error.response?.data || error.message);
      return { error: 'Failed to generate response.' };
    }
  }
}
