<?php
require_once "db_connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $employee_no = $_POST["employee_no"];
    $birth_date = $_POST["birth_date"];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $gender = $_POST["gender"];
    $hire_date = $_POST["hire_date"];

    $sql = "INSERT INTO employees (employee_no, birth_date, first_name, last_name, gender, hire_date) 
            VALUES ('$employee_no', '$birth_date', '$first_name', '$last_name', '$gender', '$hire_date')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
