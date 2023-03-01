<?php
session_start(); // start the session

// unset all session variables
$_SESSION = array();

// destroy the session
session_destroy();

// redirect to the login page or any other page you want
header('Location: index.php');
exit;
?>
