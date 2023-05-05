const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.get('/add-dept-manager', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Add Department Manager</title>
      </head>
      <body>
        <h1>Add Department Manager</h1>
        <form method="POST" action="/add-dept-manager">
          <label for="dept_no">Department Number:</label>
          <input type="text" id="dept_no" name="dept_no" required>

          <label for="emp_no">Employee Number:</label>
          <input type="text" id="emp_no" name="emp_no" required>

          <label for="from_date">From Date:</label>
          <input type="date" id="from_date" name="from_date" required>

          <label for="to_date">To Date:</label>
          <input type="date" id="to_date" name="to_date" required>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/add-dept-manager', (req, res) => {
  const { dept_no, emp_no, from_date, to_date } = req.body;
  const query = `INSERT INTO dept_manager (dept_no, emp_no, from_date, to_date) VALUES ('${dept_no}', '${emp_no}', '${from_date}', '${to_date}')`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving department manager data');
    } else {
      console.log(`Department manager with ID ${result.insertId} saved to database`);
      res.send('Department manager data saved successfully');
    }
  });
});