<?php
session_start();
  require_once('database.php');

// Check if user is authenticated
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
  $_SESSION['error'] = "You need to log in first.";
  header("Location: index.php");
  exit;
}

// Get the ID of the record to be deleted
$id = $_POST['id'];

// Construct and execute the SQL query to delete the record
$sql = "DELETE FROM my_table WHERE id = $id";
$result = mysqli_query($conn, $sql);

if ($result) {
  $_SESSION['success'] = "Record deleted successfully.";
} else {
  $_SESSION['error'] = "Error deleting record: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);

// Redirect back to the original page
header("Location: data-masuk.php");
exit;
?>
