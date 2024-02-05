// server.js

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const questions = [
  //Geography Questions
  {
    category: 'Geography',
    question: "Which of these U.S. states does NOT border Canada?",
    answers: ["Alaska", "Indiana", "Maine", "Minnesota"],
    correctAnswer: "Indiana"
  },
  {
    category: 'Geography',
    question: "Which of these countries was NOT a part of the Soviet Union?",
    answers: ["Belarus", "Georgia", "Poland", "Ukraine"],
    correctAnswer: "Poland"
  },
  {
    category: 'Geography',
    question: "Which of these cities is NOT a national capital?",
    answers: ["Bangkok", "Cairo", "Prague", "Sydney"],
    correctAnswer: "Sydney"
  },
  {
    category: 'Geography',
    question: "Which of these cities does NOT border the Mediterranean Sea?",
    answers: ["Alexandria", "Barcelona", "Lisbon", "Monaco"],
    correctAnswer: "Lisbon"
  },
  {
    category: 'Geography',
    question: "Which of these countries was NEVER part of the British Empire?",
    answers: ["Ireland", "Kenya", "New Zealand", "Thailand"],
    correctAnswer: "Thailand"
  },
  {
    category: 'Geography',
    question: "Which one of these cities is NOT in the Southern Hemisphere?",
    answers: ["Brasilia", "Brisbane", "Colombo", "Johannesburg"],
    correctAnswer: "Colombo"
  },
  {
    category: 'Geography',
    question: "What is Earth's largest continent?",
    answers: ["Asia", "Africa", "Europe", "Antarctica"],
    correctAnswer: "Asia"
  },
  {
    category: 'Geography',
    question: "What razor-thin country accounts for more than half of the western coastline of South America?",
    answers: ["Bolivia", "Ecudador", "Chile", "Peru"],
    correctAnswer: "Chile"
  },
  {
    category: 'Geography',
    question: "What river runs through Baghdad?",
    answers: ["Tigris", "Euphrates", "Karun", "Jordan"],
    correctAnswer: "Tigris"
  },
  {
    category: 'Geography',
    question: "What is the only sea without any coasts?",
    answers: ["Adriactic Sea", "Celebes Sea", "Sargasso Sea", "Mediterranean Sea"],
    correctAnswer: "Sargasso Sea"
  },
  {
    category: 'Geography',
    question: "What is the driest place on Earth?",
    answers: ["Sahara Desert", "Kufra, Libya", "Atacama Desert", "Mcmurdo, Antarctica"],
    correctAnswer: "Mcmurdo, Antarctica"
  },
  {
    category: 'Geography',
    question: "Which African nation has the most pyramids?",
    answers: ["Sudan", "Algeria", "Libya", "Egypt"],
    correctAnswer: "Sudan"
  },
  {
    category: 'Geography',
    question: "In what country can you visit Machu Picchu?",
    answers: ["Peru", "Bolivia", "Columbia", "Chile"],
    correctAnswer: "Peru"
  },
  {
    category: 'Geography',
    question: "Which U.S. state has the most active volcanoes?",
    answers: ["California", "Washington", "Hawaii", "Alaska"],
    correctAnswer: "Alaska"
  },
  {
    category: 'Geography',
    question: "What is the oldest city in the world?",
    answers: ["Damascus", "Jericho", "Athens", "Jerusalem"],
    correctAnswer: "Damascus"
  },
  //Science Questions
  {
    category: 'Science',
    question: " When was the idea of the atom first introduced?",
    answers: ["1791", "1942", "450 B.C.", "1050"],
    correctAnswer: "450 B.C."
  },
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
