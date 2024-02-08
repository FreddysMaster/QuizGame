import mysql from 'mysql';
import axios from 'axios';
import {decode} from 'html-entities';

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

  connection.query(createTableSql, (error, results) => {
    if (error) throw error;
    console.log("Table created or already exists.");

    // List of category IDs to fetch questions for
    const categories = [9,  10,  11,  12,  13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32];

    // Function to fetch and insert questions for a given category
    const fetchAndInsertQuestions = async (categoryId) => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=15&category=${categoryId}&type=multiple`);
        const questions = response.data.results;
    
        // Insert each question into the database
        const promises = questions.map(question => {
          const answersArray = [...question.incorrect_answers, question.correct_answer];
          const randomPosition = Math.floor(Math.random() * (answersArray.length +  1));
    
          // Move the correct answer to a random position in the array
          answersArray.splice(randomPosition,  0, answersArray.pop());
    
          const item = {
            category: question.category,
            question: decode(question.question),
            answers: JSON.stringify(answersArray),
            correctAnswer: question.correct_answer
          };
    
          return new Promise((resolve, reject) => {
            connection.query('INSERT INTO questions SET ?', item, (error, results) => {
              if (error) {
                reject(error);
              } else {
                console.log(`Inserted record for ${item.question}`);
                resolve();
              }
            });
          });
        });
    
        // Wait for all queries to complete
        await Promise.all(promises);
      } catch (error) {
        console.error(`Error fetching trivia questions for category ${categoryId}:`, error);
      }
    };
    

    // Loop through all categories and fetch questions with a delay
    const fetchWithDelay = async (categoryIds) => {
      for (const categoryId of categoryIds) {
        await fetchAndInsertQuestions(categoryId);
        // Wait for 5 seconds before fetching the next category
        await new Promise(resolve => setTimeout(resolve,  5000));
      }
    };

    // Start fetching questions with a delay
    fetchWithDelay(categories)
      .then(() => {
        console.log("All records inserted successfully.");
        connection.end();
      })
      .catch((error) => {
        console.error("An error occurred during query execution:", error);
        connection.end();
      });
  });
});
