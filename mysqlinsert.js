import mysql from 'mysql';
import { getQuestions } from "@trivia-api/fetch";

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QuizGame'
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

  const createTableSql = `
  CREATE TABLE IF NOT EXISTS questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      question TEXT NOT NULL,
      answers TEXT NOT NULL,
      correctAnswer VARCHAR(255) NOT NULL
  );`;

  connection.query(createTableSql, async (error, results) => {
    if (error) throw error;
    console.log("Table created or already exists.");

    try {
      // Loop 10 times to fetch and insert questions
      for (let i = 0; i < 10; i++) {
        await insertQuestions();
      }
    } catch (error) {
      console.error(`Error fetching and inserting trivia questions:`, error);
    }
  });
});

async function insertQuestions() {
  try {
    const questions = await getQuestions({ limit: 50 });
    // Insert each question into the database
    questions.forEach(question => {
      const { category, question: qObject, correctAnswer, incorrectAnswers } = question;
      const questionText = qObject.text; // Extract question text from the object
      const answers = JSON.stringify([...incorrectAnswers, correctAnswer]);
      const randomPosition = Math.floor(Math.random() * (incorrectAnswers.length + 1));
      const answersArray = JSON.parse(answers);
      answersArray.splice(randomPosition, 0, answersArray.pop());

      const item = {
        category: category,
        question: questionText,
        answers: JSON.stringify(answersArray),
        correctAnswer: correctAnswer
      };

      connection.query('INSERT INTO questions SET ?', item, (error, results) => {
        if (error) {
          console.error(`Error inserting question into database:`, error);
        } else {
          console.log(`Inserted question: ${questionText}`);
        }
      });
    });
  } catch (error) {
    throw error; // Propagate error for better error handling
  }
}
