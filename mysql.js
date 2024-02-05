import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QuizGame'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
