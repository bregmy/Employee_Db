const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL configuration
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'People2255$$',
  database: 'employee'
});

// Departments endpoint
app.post('/departments', (req, res) => {
  const { dept_no, dept_name } = req.body;
  const query = `INSERT INTO departments (dept_no, dept_name) VALUES (?, ?)`;
  connection.query(query, [dept_no, dept_name], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send('Data inserted successfully!');
  });
});

// Dept Employee endpoint
app.post('/dept_employee', (req, res) => {
  const { emp_no, dept_no, from_date, to_date } = req.body;
  const query = `INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES (?, ?, ?, ?)`;
  connection.query(query, [emp_no, dept_no, from_date, to_date], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send('Data inserted successfully!');
  });
});

// Department Manager endpoint
app.post('/department_manager', (req, res) => {
  const { dept_no, emp_no, from_date, to_date } = req.body;
  const query = `INSERT INTO dept_manager (dept_no, emp_no, from_date, to_date) VALUES (?, ?, ?, ?)`;
  connection.query(query, [dept_no, emp_no, from_date, to_date], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send('Data inserted successfully!');
  });
});

// Employees endpoint
app.post('/employees', (req, res) => {
  const { emp_no, birth_date, first_name, last_name, gender, hire_date } = req.body;
  const query = `INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(query, [emp_no, birth_date, first_name, last_name, gender, hire_date], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send('Data inserted successfully!');
  });
});

// Salaries endpoint
app.post('/salaries', (req, res) => {
  const { emp_no, salary, from_date, to_date } = req.body;
  const query = `INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES (?, ?, ?, ?)`;
  connection.query(query, [emp_no, salary, from_date, to_date], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send('Data inserted successfully!');
  });
});

// Titles endpoint
app.post('/titles', (req, res) => {
  const { emp_no, title, from_date, to_date } = req.body;
  const query = `INSERT INTO titles (emp_no, title, from_date, to_date) VALUES (?, ?, ?, ?)`;
  connection.query(query[emp_no, title, from_date, to_date], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send('Data inserted successfully!');
  });
});

console.log('End of script.');
// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});