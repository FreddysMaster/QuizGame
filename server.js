// server.js

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const questions = [
  {
    category: 'General Knowledge',
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    category: 'General Knowledge',
    question: "What is the capital of The United Kingdom?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "London"
  },
  // Add more questions with categories...
];

app.use(express.json());
app.use(cors());

app.get('/api/questions', (req, res) => {
  // Return all questions from the mock database
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
