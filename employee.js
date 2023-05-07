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
      background-color: #fefefe;
      margin: 0;
      padding: 0;
      background: url("https://cdn.dribbble.com/users/24711/screenshots/3886002/falcon_persistent_connection_2x.gif");
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

// Insert a new department
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

// Update a department
app.put('/department/:dept_no', (req, res) => {
  const { dept_no } = req.params;
  const { dept_name } = req.body;
  const updateQuery = `UPDATE departments SET dept_name='${dept_name}' WHERE dept_no='${dept_no}'`;

  // Update departments table
  connection.query(updateQuery, (updateErr, updateResult) => {
    if (updateErr) {
      console.error(updateErr);
      res.status(500).send('Error updating department data');
    } else if (updateResult.affectedRows === 0) {
      res.status(404).send(`Department with ID ${dept_no} not found`);
    } else {
      console.log(`Department with ID ${dept_no} updated successfully`);
      res.send(`Department with ID ${dept_no} updated successfully`);
    }
  });
});

// Delete a department
app.delete('/department/:dept_no', (req, res) => {
  const { dept_no } = req.params;
  const deleteQuery = `DELETE FROM departments WHERE dept_no='${dept_no}'`;

  // Delete from departments table
  connection.query(deleteQuery, (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error(deleteErr);
      res.status(500).send('Error deleting department data');
    } else if (deleteResult.affectedRows === 0) {
      res.status(404).send(`Department with ID ${dept_no} not found`);
    } else {
      console.log(`Department with ID ${dept_no} deleted successfully`);
      res.send(`Department with ID ${dept_no} deleted successfully`);
    }
  });
});

// Search for a department
app.get('/department', (req, res) => {
  const { search } = req.query;
  const searchQuery = `SELECT * FROM departments WHERE dept_no='${search}' OR dept_name LIKE '%${search}%'`;

  // Search departments table
  connection.query(searchQuery, (searchErr, searchResult) => {
    if (searchErr) {
      console.error(searchErr);
      res.status(500).send('Error searching department data');
    } else {
      console.log(`Found ${searchResult.length} departments`);
      res.render('department_search', { departments: searchResult });
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

app.post('/salaries', (req, res) => {
  const { emp_no, salary, from_date, to_date } = req.body;

  // Check if emp_no exists in employees table
  const checkEmpNoQuery = `SELECT * FROM employees WHERE emp_no = ${emp_no}`;

  connection.query(checkEmpNoQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      res.status(500).send('Error checking employee data');
    } else if (checkResult.length === 0) {
      res.status(400).send(`Employee with ID ${emp_no} does not exist`);
    } else {
      // Insert into salaries table
      const insertQuery = `INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES (${emp_no}, ${salary}, '${from_date}', '${to_date}')`;

      connection.query(insertQuery, (insertErr, insertResult) => {
        if (insertErr) {
          console.error(insertErr);
          res.status(500).send('Error saving salary data : ${insertErr.message}');
        } else {
          console.log(`Salary record with ID ${insertResult.insertId} saved to database`);
          res.send('Salary data saved successfully');
        }
      });
    }
  });
});


app.get('/employees.html', (req, res) => {
  res.render('employees');
});
// Create a new employee
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
      res.send(`Employee with emp_no ${emp_no} saved`);
    }
  });
});

// Search for employees
app.get('/search', (req, res) => {
  const searchTerm = req.query.search_term;

  const sql = `SELECT * FROM employees WHERE first_name LIKE ? OR last_name LIKE ?`;
  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error searching employees');
    } else {
      const employees = results.map(row => ({
        emp_no: row.emp_no,
        birth_date: row.birth_date,
        first_name: row.first_name,
        last_name: row.last_name,
        gender: row.gender,
        hire_date: row.hire_date
      }));

      res.render('search', { searchTerm, employees });
    }
  });
});

// Update an employee
app.post('/update', (req, res) => {
  const { emp_no, first_name, last_name, hire_date } = req.body;

  const sql = `UPDATE employees SET first_name = ?, last_name = ?, hire_date = ? WHERE emp_no = ?`;
  const values = [first_name, last_name, hire_date, emp_no];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating employee');
    } else {
      console.log(`Employee with emp_no ${emp_no} updated`);
      res.send(`Employee with emp_no ${emp_no} updated`);
    }
  });
});

// Delete an employee
app.post('/delete', (req, res) => {
  const emp_no = req.body.emp_no;

  const sql = `DELETE FROM employees WHERE emp_no = ?`;
  const values = [emp_no];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting employee');
    } else {
      console.log(`Employee with emp_no ${emp_no} deleted`);
      res.redirect('/');
    }
  });
});







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
