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
    const sql = 'SELECT * FROM questions';
    db.query(sql, (err, results) => {
        if (err) throw err;
        // Parse answers back to array format
        results.forEach(question => {
            question.answers = JSON.parse(question.answers);
        });
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
