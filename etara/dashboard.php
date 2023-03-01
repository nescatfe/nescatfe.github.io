<?php
  session_start();
  if (!isset($_SESSION['authenticated']) || !$_SESSION['authenticated']) {
    header('Location: index.php');
    exit;
  }
  include 'menu-bar.php';
?>
<!-- Your HTML code goes here -->
<head>
  <title>Dashboard</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<div class="vertical-menu">
  <form method="post" action="save-data.php">
    <label for="date_input">Tanggal Pengambilan:</label>
    <input type="date" id="dateInput" name="dateInput" required>
    
    <label for="name">No Perkara:</label>
    <input type="text" id="noperkara" name="noperkara" required>
    
    <label for="name">Nama Penggugat:</label>
    <input type="text" id="namapenggugat" name="namapenggugat" required>
    
    <label for="wife_name">Nama Tergugat:</label>
    <input type="text" id="namatergugat" name="namatergugat" required>
    
    <label for="wife_name">Nomor Akta Cerai:</label>
    <input type="text" id="noaktacerai" name="noaktacerai" required>
    
    <label for="card_identity">Identitas:</label>
    <input type="text" id="kartuidentitas" name="kartuidentitas" required>
    
    <label for="card_identity">Nomor Identitas:</label>
    <input type="text" id="nomoridentitas" name="nomoridentitas" required>
    
    <label for="wife_card_identity">Alamat:</label>
    <input type="text" id="alamat" name="alamat" required>
    
    <button type="submit">Submit</button>
  </form>
</div>
