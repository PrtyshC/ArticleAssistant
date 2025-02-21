import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('api')
export class SummarizeController {
  private apiKey = 'Enter a Valid Gemini API Key'; 

  @Post('summarize')
  async summarize(@Body() body: { text: string }) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

      const requestBody = {
        systemInstruction: {
          parts: [
            {
              text: `Summarize the following article in a concise and informative manner, capturing the key points.`,
            },
          ],
        },
        contents: [
          {
            parts: [
              { text: body.text },
            ],
          },
        ],
      };

      const response = await axios.post(endpoint, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Full Gemini API Response:", JSON.stringify(response.data, null, 2));

      //Check if response has expected structure
      if (!response.data) {
        console.error("No response data from Gemini API.");
        return { error: "No response from Gemini API." };
      }

      if (!response.data.candidates || response.data.candidates.length === 0) {
        console.error("Gemini API returned no candidates:", response.data);
        return { error: "Gemini API returned an empty response." };
      }

      const firstCandidate = response.data.candidates[0];
      
      if (!firstCandidate.content || !firstCandidate.content.parts || firstCandidate.content.parts.length === 0) {
        console.error("Unexpected response format from Gemini:", response.data);
        return { error: "Unexpected response format from Gemini API." };
      }

      const summary = firstCandidate.content.parts[0].text || "No summary found.";

      return { summary };
    } catch (error) {
      console.error("Error in Summarization:", error.response?.data || error.message);
      return { error: "Failed to summarize text." };
    }
  }
}
