import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

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

app.get('/api/questions', (req, res) => {
  const sqlQuery = 'SELECT * FROM questions';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    const questions = results.map(question => ({
        question: question.question,
        answer1: question.answer1,
        answer2: question.answer2,
        answer3: question.answer3,
        answer4: question.answer4,
        correctAnswer: question.correctAnswer,
        category: question.category
    }));


    
    res.json(questions);
  });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
