$host = "localhost";
$dbname = "mydatabase";
$username = "myusername";
$password = "mypassword";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}