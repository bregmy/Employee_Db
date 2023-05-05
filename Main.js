const express = require('express');
const app = express();

// Import employee route
const employeeRoute = require('./employee');
// Import department manager route
const deptManagerRoute = require('./Dep_manger_route');

// Use the employee route for requests to /employees
app.use('/employees', employeeRoute);
// Use the department manager route for requests to /dept_manager
app.use('/dept_manager', deptManagerRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});