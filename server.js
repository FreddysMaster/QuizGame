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

// endpoint for fetching questions
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
        category_id: question.category_id
    }));

    res.json(questions);
  });
});

// endpoint for fetching categories
app.get('/api/categories', (req, res) => {
  const sqlQuery = 'SELECT * FROM categories';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    const categories = results.map(category => ({
        category_id: category.category_id,
        category: category.category
    }));

    res.json(categories);
  });
});

// endpoint for fetching questions
app.get('/api/users', (req, res) => {
  const sqlQuery = 'SELECT * FROM users';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    const users = results.map(users => ({
      user_id: users.user_id,
      username: users.username,
      password: users.password,
      highscore: users.highscore,
      user_type: users.user_type,
    }));

    res.json(users);
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
