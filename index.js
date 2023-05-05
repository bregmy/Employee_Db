const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// configure body-parser middleware to handle JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "People2255$$",
  database: "employee",
});

// connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database!");
});

// handle POST requests to the /submit endpoint
app.post("/submit", (req, res) => {
  const { employee_no, birth_date, first_name, last_name, gender, hire_date } =
    req.body;

  // create a new row in the "employees" table
  const sql =
    "INSERT INTO employees (employee_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [employee_no, birth_date, first_name, last_name, gender, hire_date];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      res.status(500).send("Error inserting data into database");
      return;
    }
    console.log("Data inserted successfully!");
    res.status(200).send("Data inserted successfully");
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
