<?php
session_start();
require_once('database.php');
// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // Validate input
  $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
  $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

  // Check if username or password is empty
  if (empty($username) || empty($password)) {
    $_SESSION['error'] = 'Please fill in all fields.';
    header('Location: index.php');
    exit;
  }

  // Prepare the SQL statement to fetch the user from the database
  $stmt = $conn->prepare('SELECT * FROM users WHERE username = ?');
  $stmt->bind_param('s', $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $data = $result->fetch_assoc();

  // Check if the user exists
  if (!$data) {
    $_SESSION['error'] = 'Incorrect username or password.';
    header('Location: index.php');
    exit;
  }

  // Hash the password with the salt and compare with the stored hash
  $hash = hash('sha256', $password . $data['salt']);
  if ($hash !== $data['password']) {
    $_SESSION['error'] = 'Incorrect username or password.';
    header('Location: index.php');
    exit;
  }

  // Set the user as authenticated
  $_SESSION['authenticated'] = true;
  $_SESSION['username'] = $data['username'];

  // Close the database connection
  mysqli_close($conn);

  // Redirect to the dashboard
  header('Location: dashboard.php');
  exit;
}
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Login | Pengedilan Agama Ponorogo</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <div style="text-align: center;">
      <img src="/pa_png_logo.png" alt="Pengadilan Agama Ponorogo" style="display: block; margin: auto;" /><hr><br>
    </div>
    <h1>Pengambilan Akta Cerai Pengadilan Agama Ponorogo</h1><br>
    <div id="login-box">
      <?php if (isset($_SESSION['error'])): ?>
      <div><?php echo $_SESSION['error']; ?></div>
      <?php unset($_SESSION['error']); ?>
      <?php endif; ?>
      
      <form method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      
        <input type="submit" value="Login">
        <h2>Cek Status Akta Cerai <br><a href="/cekstatus/" target="_blank">Klik Disini</a></h2>
      </form>
    </div>
  </body>
</html>
