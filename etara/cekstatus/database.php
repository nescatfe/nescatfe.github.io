<?php
  $host = "localhost";
  $username = "id20303528_datacerai12";
  $password = "8R6~0e>a9c8O|0C?";
  $dbname = "id20303528_datacerai";

  // Create a connection
  $conn = mysqli_connect($host, $username, $password, $dbname);

  // Check connection
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
?>
