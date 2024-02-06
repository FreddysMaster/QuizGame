import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import axios from 'axios';

const app = express();
const port =  3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QuizGame'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

app.use(express.json());
app.use(cors());


app.get('/api/questions', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=50&type=multiple');
    const questions = response.data.results.map(question => ({
      category: question.category,
      question: question.question,
      answers: [...question.incorrect_answers, question.correct_answer],
      correctAnswer: question.correct_answer
    }));
    res.json(questions);
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
