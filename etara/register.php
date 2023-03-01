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
    header('Location: register.php');
    exit;
  }

  // Prepare the SQL statement to check if the username already exists
  $stmt = $conn->prepare('SELECT COUNT(*) AS count FROM users WHERE username = ?');
  $stmt->bind_param('s', $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $data = $result->fetch_assoc();

  // Check if the username already exists
  if ($data['count'] > 0) {
    $_SESSION['error'] = 'The username is already taken.';
    header('Location: register.php');
    exit;
  }

  // Generate a random salt for the password hash
  $salt = bin2hex(random_bytes(16));

  // Hash the password with the salt
  $hash = hash('sha256', $password . $salt);

  // Prepare the SQL statement to insert the user into the database
  $stmt = $conn->prepare('INSERT INTO users (username, password, salt) VALUES (?, ?, ?)');
  $stmt->bind_param('sss', $username, $hash, $salt);
  $stmt->execute();

  // Close the database connection
  mysqli_close($conn);

  // Redirect to the login page
  header('Location: index.php');
  exit;
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
  <body>
    <?php include 'menu-bar.php'; ?>
    <center><h2>Register Admin</h2></center>
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

    <input type="submit" value="Register">
  </form>
    </div>
</body>
</html>
