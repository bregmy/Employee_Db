const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'People2255$$',
  database: 'employee'
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Employee Information Form</title>
      </head>
      <body>
        <h1>Employee Information Form</h1>
        <form method="POST" action="/employees">
          <label for="emp_no">Employee No:</label>
          <input type="text" id="emp_no" name="emp_no" required>

          <label for="birth_date">Birth Date:</label>
          <input type="date" id="birth_date" name="birth_date" required>

          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" required>

          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" required>

          <label for="gender">Gender:</label>
          <input type="radio" id="male" name="gender" value="M" required>
          <label for="male">Male</label>
          <input type="radio" id="female" name="gender" value="F">
          <label for="female">Female</label>

          <label for="hire_date">Hire Date:</label>
          <input type="date" id="hire_date" name="hire_date" required>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/employees', (req, res) => {
  const { emp_no, birth_date, first_name, last_name, gender, hire_date } = req.body;
  const query = `INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES ('${emp_no}', '${birth_date}', '${first_name}', '${last_name}', '${gender}', '${hire_date}')`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving employee data');
    } else {
      console.log(`Employee with ID ${result.insertId} saved to database`);
      res.send('Employee data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
