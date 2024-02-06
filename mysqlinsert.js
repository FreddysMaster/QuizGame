import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QuizGame'
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");

    // Create the questions table if it does not exist
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

const questionData = [
    //Geography Questions
    {
      category: 'Geography',
      question: "Which of these U.S. states does NOT border Canada?",
      answers: JSON.stringify(["Alaska", "Indiana", "Maine", "Minnesota"]),
      correctAnswer: "Indiana"
    },
    {
      category: 'Geography',
      question: "Which of these countries was NOT a part of the Soviet Union?",
      answers: JSON.stringify(["Belarus", "Georgia", "Poland", "Ukraine"]),
      correctAnswer: "Poland"
    },
    {
      category: 'Geography',
      question: "Which of these cities is NOT a national capital?",
      answers: JSON.stringify(["Bangkok", "Cairo", "Prague", "Sydney"]),
      correctAnswer: "Sydney"
    },
    {
      category: 'Geography',
      question: "Which of these cities does NOT border the Mediterranean Sea?",
      answers: JSON.stringify(["Alexandria", "Barcelona", "Lisbon", "Monaco"]),
      correctAnswer: "Lisbon"
    },
    {
      category: 'Geography',
      question: "Which of these countries was NEVER part of the British Empire?",
      answers: JSON.stringify(["Ireland", "Kenya", "New Zealand", "Thailand"]),
      correctAnswer: "Thailand"
    },
    {
      category: 'Geography',
      question: "Which one of these cities is NOT in the Southern Hemisphere?",
      answers: JSON.stringify(["Brasilia", "Brisbane", "Colombo", "Johannesburg"]),
      correctAnswer: "Colombo"
    },
    {
      category: 'Geography',
      question: "What is Earth's largest continent?",
      answers: JSON.stringify(["Asia", "Africa", "Europe", "Antarctica"]),
      correctAnswer: "Asia"
    },
    {
      category: 'Geography',
      question: "What razor-thin country accounts for more than half of the western coastline of South America?",
      answers: JSON.stringify(["Bolivia", "Ecudador", "Chile", "Peru"]),
      correctAnswer: "Chile"
    },
    {
      category: 'Geography',
      question: "What river runs through Baghdad?",
      answers: JSON.stringify(["Tigris", "Euphrates", "Karun", "Jordan"]),
      correctAnswer: "Tigris"
    },
    {
      category: 'Geography',
      question: "What is the only sea without any coasts?",
      answers: JSON.stringify(["Adriactic Sea", "Celebes Sea", "Sargasso Sea", "Mediterranean Sea"]),
      correctAnswer: "Sargasso Sea"
    },
    {
      category: 'Geography',
      question: "What is the driest place on Earth?",
      answers: JSON.stringify(["Sahara Desert", "Kufra, Libya", "Atacama Desert", "Mcmurdo, Antarctica"]),
      correctAnswer: "Mcmurdo, Antarctica"
    },
    {
      category: 'Geography',
      question: "Which African nation has the most pyramids?",
      answers: JSON.stringify(["Sudan", "Algeria", "Libya", "Egypt"]),
      correctAnswer: "Sudan"
    },
    {
      category: 'Geography',
      question: "In what country can you visit Machu Picchu?",
      answers: JSON.stringify(["Peru", "Bolivia", "Columbia", "Chile"]),
      correctAnswer: "Peru"
    },
    {
      category: 'Geography',
      question: "Which U.S. state has the most active volcanoes?",
      answers: JSON.stringify(["California", "Washington", "Hawaii", "Alaska"]),
      correctAnswer: "Alaska"
    },
    {
      category: 'Geography',
      question: "What is the oldest city in the world?",
      answers: JSON.stringify(["Damascus", "Jericho", "Athens", "Jerusalem"]),
      correctAnswer: "Damascus"
    },
    //Science Questions
    {
      category: 'Science',
      question: "When was the idea of the atom first introduced?",
      answers: JSON.stringify(["1791", "1942", "450 B.C.", "1050"]),
      correctAnswer: "450 B.C."
    },
    {
      category: 'Science',
      question: "Which of the following is a renewable source of energy?",
      answers: JSON.stringify(["Coal", "Natural gas", "Solar power", "Nuclear power"]),
      correctAnswer: "Solar power"
    },
    {
      category: 'Science',
      question: "Which planet is known as the “Red Planet”?",
      answers: JSON.stringify(["Venus", "Mars", "Jupiter", "Saturn"]),
      correctAnswer: "Mars"
    },
    {
      category: 'Science',
      question: "What is the primary gas that makes up the EarthU+0060s atmosphere?",
      answers: JSON.stringify(["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"]),
      correctAnswer: "Nitrogen"
    },
    {
      category: 'Science',
      question: "What process is responsible for the energy production in the Sun?",
      answers: JSON.stringify(["Nuclear fusion", "Nuclear fission", "Photosynthesis", "Combustion"]),
      correctAnswer: "Nuclear fusion"
    },
    {
      category: 'Science',
      question: "What is the smallest unit of life?",
      answers: JSON.stringify(["Cell", "Atom", "Molecule", "Organ"]),
      correctAnswer: "Cell"
    },
    {
      category: 'Science',
      question: "Which of the following is a mammal?",
      answers: JSON.stringify(["Snake", "Turtle", "Dolphin", "Crocodile"]),
      correctAnswer: "Dolphin"
    },
];

        // Use Promise.all to wait for all queries to finish
        Promise.all(questionData.map((item) => {
          return new Promise((resolve, reject) => {
              const query = "INSERT INTO questions SET ?";
              connection.query(query, item, (error, results) => {
                  if (error) reject(error);
                  console.log("Record inserted successfully.");
                  resolve();
              });
          });
      })).then(() => {
          // Only close the connection once all queries are done
          connection.end();
      }).catch((error) => {
          console.error("An error occurred during query execution:", error);
          connection.end();
      });
  });
});