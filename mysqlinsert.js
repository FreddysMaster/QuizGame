import mysql from 'mysql';
import { getQuestions } from "@trivia-api/fetch";

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect(async (error) => {
  if (error) throw error;
  console.log("Successfully connected to the server.");

  try {
    // Check if the QuizGame database exists, if not, create it
    const createDatabaseSql = "CREATE DATABASE IF NOT EXISTS QuizGame;";
    await new Promise((resolve, reject) => {
      connection.query(createDatabaseSql, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    console.log("Database created or already exists.");

    // Now connect to the newly created (or existing) database
    await new Promise((resolve, reject) => {
      connection.changeUser({ database: 'QuizGame' }, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    console.log("Switched to QuizGame database.");

    // Create the questions table
    const createQuestionsTableSql = `
      CREATE TABLE IF NOT EXISTS questions (
          question_id INT AUTO_INCREMENT PRIMARY KEY,
          category VARCHAR(255) NOT NULL,
          question TEXT NOT NULL,
          answers TEXT NOT NULL,
          correctAnswer VARCHAR(255) NOT NULL
      );`;

    // Create the user table
    const createUserTableSql = `
      CREATE TABLE IF NOT EXISTS users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          highscore INT DEFAULT ('0')
      );`;

    // Create the leaderboard table
    const createLeaderboardTableSql = `
      CREATE TABLE IF NOT EXISTS leaderboard (
          leaderboard_id INT AUTO_INCREMENT PRIMARY KEY,
          FOREIGN KEY (user_id) REFERENCES users(user_id),
          score INT DEFAULT ('0')
      )`;

    // Execute both table creation queries
    await new Promise((resolve, reject) => {
      connection.query(createQuestionsTableSql, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    console.log("Questions table created or already exists.");

    await new Promise((resolve, reject) => {
      connection.query(createUserTableSql, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    console.log("Users table created or already exists.");

    await new Promise((resolve, reject) => {
      connection.query(createLeaderboardTableSql, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    console.log("Leaderboard table created or already exists.");

    // Fetch and insert questions
    try {
      for (let i =  0; i <  10; i++) {
        await insertQuestions();
      }
      // Close the connection after all questions have been inserted
      connection.end((error) => {
        if (error) throw error;
        console.log('MySQL connection closed successfully.');
      });
    } catch (error) {
      console.error(`Error fetching and inserting trivia questions:`, error);
    }
  } catch (error) {
    console.error(`Error during database setup:`, error);
  }
});

async function insertQuestions() {
  try {
    const questions = await getQuestions({ limit:  50 });
    // Insert each question into the database
    for (const question of questions) {
      const { category, question: questionObj, correctAnswer, incorrectAnswers } = question;
      const questionText = questionObj.text
      const answers = JSON.stringify([...incorrectAnswers, correctAnswer]);
      const randomPosition = Math.floor(Math.random() * (incorrectAnswers.length +  1));
      const answersArray = JSON.parse(answers);
      answersArray.splice(randomPosition,  0, answersArray.pop());

      const item = {
        category: category,
        question: questionText,
        answers: JSON.stringify(answersArray),
        correctAnswer: correctAnswer
      };

      await new Promise((resolve, reject) => {
        connection.query('INSERT INTO questions SET ?', item, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log(`Inserted question: ${questionText}`);
            resolve();
          }
        });
      });
    }
  } catch (error) {
    console.error(`Error inserting question into database:`, error);
  }
}
