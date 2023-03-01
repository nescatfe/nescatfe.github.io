<?php
  session_start(); // Start the session
  require_once('database.php');

  // Check if user is not logged in, then redirect to login page
  if (!isset($_SESSION['username'])) {
    header('Location: /index.php');
    exit;
  }
  
?>
<html>
<head>
  <title>Input Status Perkara</title>
  <style>
    body {
      background-color: #81c784; /* set background color to green */
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #fff; /* set text color to white */
      text-align: center;
      font-size: 40px;
      margin-top: 50px;
    }
    form {
      max-width: 500px;
      margin: 0 auto;
      background-color: #008000;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    label {
      display: block;
      margin-bottom: 10px;
    }
    input[type="text"], textarea {
      display: block;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: none;
      margin-bottom: 20px;
    }
    input[type="submit"] {
      background-color: #81c784;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    input[type="submit"]:hover {
      background-color: #4caf50;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #81c784;
      color: #fff;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    input[type="submit"][value="Delete"] {
      background-color: #f44336;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

  </style>
</head>
<body>
  <h1>Input Status Perkara</h1>
  
  <form action="submitstatus.php" method="post">
    <label for="statusperkara">Masukan Nomor Status Perkara yang sudah siap:</label>
    <input type="text" id="statusperkara" name="statusperkara">
    
    <input type="submit" value="Akta Cerai Bisa di Ambil">
  </form>
  
  <div class="statusperkara-list">
    <h2>Status Perkara Siap di Ambil / <a href="/dashboard.php">Dashboard</a></h2>
  </div>
</body>
</html>
<?php 
  
  // Query to retrieve all data from statusperkara table
  $sql = "SELECT * FROM statusperkara";
  $result = mysqli_query($conn, $sql);
  
  // Check if the query is successful
  if (mysqli_num_rows($result) > 0) {
    // Add a new column to the table for the delete button
    echo "<table>";
    echo "<tr><th>ID</th><th>Status Perkara</th><th>Action</th></tr>";
    
    // Output data of each row
    while ($row = mysqli_fetch_assoc($result)) {
      echo "<tr><td>" . $row["id"] . "</td><td>" . $row["status"] . "</td>";
      echo "<td><form action='deletestatus.php' method='post'>";
      echo "<input type='hidden' name='id' value='" . $row["id"] . "'>";
      echo "<input type='submit' value='Delete'></form></td></tr>";
    }
    
    echo "</table>";
  } else {
    echo "No status perkara found.";
  }
?>