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

    // Define the categories in the desired order
    const categoriesInOrder = [
      "Science",
      "Society & Culture",
      "Arts & Literature",
      "Music",
      "Sport & Leisure",
      "Food & Drink",
      "Geography",
      "General Knowledge",
      "Film & TV",
      "History"
    ];

    // Create the category table
    const createCategoriesTableSql = `
      CREATE TABLE IF NOT EXISTS categories (
          category_id INT AUTO_INCREMENT PRIMARY KEY,
          category VARCHAR(255) NOT NULL
      );`;

      
    // Create the questions table
    const createQuestionsTableSql = `
    CREATE TABLE IF NOT EXISTS questions (
        question_id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer1 VARCHAR(255) NOT NULL,
        answer2 VARCHAR(255) NOT NULL,
        answer3 VARCHAR(255) NOT NULL,
        answer4 VARCHAR(255) NOT NULL,
        correctAnswer VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );`;

     // Create the user table
     const createUserTableSql = `
     CREATE TABLE IF NOT EXISTS users (
         user_id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         highscore INT DEFAULT ('0'),
         user_type ENUM('user', 'admin') DEFAULT 'user'
     );`;

   // Create the leaderboard table
   const createLeaderboardTableSql = `
     CREATE TABLE IF NOT EXISTS leaderboard (
         rank INT AUTO_INCREMENT PRIMARY KEY,
         user_id INT NOT NULL,
         username VARCHAR(255) NOT NULL,
         score INT NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(user_id),
         time DATE
     );`
     
    // Execute the createCategoriesTableSql query
    await new Promise((resolve, reject) => {
      connection.query(createCategoriesTableSql, async (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    console.log("Category table created or already exists.");

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

    // Insert categories
    for (const category of categoriesInOrder) {
      await insertCategory(category);
    }
    console.log("Categories inserted in order.");

    // Fetch and insert questions
    try {
      for (let i = 0; i < 10; i++) {
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

async function insertCategory(categoryName) {
  try {
    // Check if the category exists
    const categoryExists = await new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS count FROM categories WHERE category = ?', [categoryName], (error, results) => {
        if (error) reject(error);
        else resolve(results[0].count > 0);
      });
    });

    // If the category doesn't exist, insert it
    if (!categoryExists) {
      await new Promise((resolve, reject) => {
        connection.query('INSERT INTO categories (category) VALUES (?)', [categoryName], (error, results) => {
          if (error) reject(error);
          else resolve();
        });
      });
      console.log(`Category inserted: ${categoryName}`);
    }
  } catch (error) {
    console.error(`Error inserting category ${categoryName}:`, error);
  }
}

async function insertQuestions() {
  try {
    const questions = await getQuestions({ limit: 50 });
    // Insert each question into the database
    for (const question of questions) {
      const { category, question: questionText, correctAnswer, incorrectAnswers } = question;
      const answers = JSON.stringify([...incorrectAnswers, correctAnswer]);
      const randomPosition = Math.floor(Math.random() * (incorrectAnswers.length + 1));
      const answersArray = JSON.parse(answers);
      answersArray.splice(randomPosition, 0, answersArray.pop());

      // Fetch or insert the category and get its ID
      const categoryId = await fetchOrInsertCategory(category);

      const item = {
        question: questionText,
        answer1: answersArray[0],
        answer2: answersArray[1],
        answer3: answersArray[2],
        answer4: answersArray[3],
        correctAnswer: correctAnswer,
        category_id: categoryId
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

async function fetchOrInsertCategory(categoryName) {
  try {
    // Check if the category exists
    let categoryId = await new Promise((resolve, reject) => {
      connection.query('SELECT category_id FROM categories WHERE category = ?', [categoryName], (error, results) => {
        if (error) reject(error);
        else resolve(results[0]?.category_id);
      });
    });

    // If the category doesn't exist, insert it
    if (!categoryId) {
      const result = await new Promise((resolve, reject) => {
        connection.query('INSERT INTO categories (category) VALUES (?)', [categoryName], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });

      
      console.log(`Category inserted: ${categoryName}`);
    }

    return categoryId;
  } catch (error) {
    console.error(`Error fetching or inserting category ${categoryName}:`, error);
    throw error;
  }
}
