# ArticleAssistant — Making news interactive
## Overview
The ArticleAssistant is a productivity-driven Chrome Extension built for media consumption enhancement. Designed for editorial and journalistic efficiency, this tool allows users to:

Instantly summarize any news article on the web

Ask contextual, article-aware questions via an embedded AI chatbot

Increase reader engagement and comprehension while reducing information overload

The solution comprises a Chrome Extension frontend and a NestJS-based backend serving summarization and chatbot functionalities powered by modern LLM architectures.

##Prerequisites
Node.js ≥ v18

NPM ≥ v9

Google Chrome (latest version)

Basic familiarity with terminal commands

## Backend Setup Instructions
To start the AI backend server locally:

cd article-assistant-backend
npm install
npm run start

The backend will be hosted at: http://localhost:3000

Ensure the server is running before using the Chrome Extension

Note: You may configure environment variables in a .env file for model endpoints, API keys, and caching options.

## Chrome Extension Setup
To run the frontend extension in Chrome:

Open chrome://extensions in your browser

Toggle Developer Mode (top-right corner)

Click “Load unpacked”

Select the article-assistant-extension folder

The extension icon will appear in the toolbar

## How It Works
Navigate to any news article

Click the extension icon → the assistant sidebar opens

Click "Summarize Article" to generate a concise overview

Use the chat interface to ask specific questions related to the article (e.g., “Who are the stakeholders involved?” or “What’s the key issue here?”)



Responses are context-aware and generated in real-time

## NOTE
A Gemini API key is required to operate this application, please put your API key summarize.controller.ts and chatbot.controller.ts. You can read the instructions on generating an API key here: https://ai.google.dev/gemini-api/docs/api-key
