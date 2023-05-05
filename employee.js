const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'People2255$$',
  database: 'employee'
});

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Employee Database Management System</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
      }
  
      h1 {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 20px;
      }
  
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
  
      .options {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        margin: 0 auto;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .options > button {
        background-color: #4CAF50;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-bottom: 20px;
      }
  
      .options > button:hover {
        background-color: #3e8e41;
      }
  
      .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="options">
        <div class="title">What type of information would you like to store?</div>
  
        <button onclick="location.href='departments.html'">Departments</button>
        <button onclick="location.href='dept_employee.html'">Department Employees</button>
        <button onclick="location.href='department_manager.html'">Department Managers</button>
        <button onclick="location.href='employees.html'">Employees</button>
        <button onclick="location.href='salaries.html'">Salaries</button>
        <button onclick="location.href='titles.html'">Titles</button>
      </div>
    </div>
  </body>
  </html>
  

  `);
});

app.get('/departments.html', (req, res) => {
  res.render('department');
});

app.post('/department', (req, res) => {
  const { dept_no, dept_name } = req.body;
  const insertQuery = `INSERT INTO departments (dept_no, dept_name) VALUES ('${dept_no}', '${dept_name}')`;

  // Insert into departments table
  connection.query(insertQuery, (insertErr, insertResult) => {
    if (insertErr) {
      console.error(insertErr);
      res.status(500).send('Error saving department data');
    } else {
      console.log(`Department with ID ${insertResult.insertId} saved to database`);
      res.send('Department data saved successfully');
    }
  });
});

app.get('/dept_employee.html', (req, res) => {
  res.render('dept_employee');
});
app.get('/titles.html', (req, res) => {
  res.render('titles');
});
app.get('/department_manager.html', (req, res) => {
  res.render('department_manager');
});
app.post('/dep_manager', (req, res) => {
  const { dept_no, emp_no, from_date, to_date } = req.body;
  const checkDeptQuery = `SELECT dept_no FROM departments WHERE dept_no = '${dept_no}'`;
  const checkEmpQuery = `SELECT emp_no FROM employees WHERE emp_no = '${emp_no}'`;
  const insertQuery = `INSERT INTO dept_manager (dept_no, emp_no, from_date, to_date) VALUES ('${dept_no}', '${emp_no}', '${from_date}', '${to_date}')`;

  // Check if dept_no exists in departments table
  connection.query(checkDeptQuery, (checkDeptErr, checkDeptResult) => {
    if (checkDeptErr) {
      console.error(checkDeptErr);
      res.status(500).send('Error checking department data');
      return;
    }

    if (checkDeptResult.length === 0) {
      res.status(400).send(`Department with dept_no '${dept_no}' does not exist`);
      return;
    }

    // Check if emp_no exists in employees table
    connection.query(checkEmpQuery, (checkEmpErr, checkEmpResult) => {
      if (checkEmpErr) {
        console.error(checkEmpErr);
        res.status(500).send('Error checking employee data');
        return;
      }

      if (checkEmpResult.length === 0) {
        res.status(400).send(`Employee with emp_no '${emp_no}' does not exist`);
        return;
      }

      // Insert into dept_manager table
      connection.query(insertQuery, (insertErr, insertResult) => {
        if (insertErr) {
          console.error(insertErr);
          res.status(500).send('Error saving department manager data');
        } else {
          console.log(`Department manager with ID ${insertResult.insertId} saved to database`);
          res.send('Department manager data saved successfully');
        }
      });
    });
  });
});


app.get('/salaries.html', (req, res) => {
  res.render('salaries');
});
app.get('/employees.html', (req, res) => {
  res.render('employees');
});
app.post('/employees', (req, res) => {
  const { emp_no, birth_date, first_name, last_name, gender, hire_date } = req.body;
  
  // Check if emp_no is provided
  if (!emp_no) {
    res.status(400).send('emp_no is required');
    return;
  }

  const sql = `INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [emp_no, birth_date, first_name, last_name, gender, hire_date];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving employee');
    } else {
      console.log(`Employee with emp_no ${emp_no} saved`);
      res.redirect('/');
    }
  });
});







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
