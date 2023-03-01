<?php
  session_start();
  require_once('database.php');

  // Check if user is authenticated
  if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    $_SESSION['error'] = "You need to log in first.";
    header("Location: index.php");
    exit;
  }
// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  // Get the form data
  $dateInput = $_POST['dateInput'];
  $noPerkara = $_POST['noperkara'];
  $namaPenggugat = $_POST['namapenggugat'];
  $namaTergugat = $_POST['namatergugat'];
  $noAktaCerai = $_POST['noaktacerai'];
  $kartuIdentitas = $_POST['kartuidentitas'];
  $nomorIdentitas = $_POST['nomoridentitas'];
  $alamat = $_POST['alamat'];

  // Prepare the SQL statement
  $sql = "INSERT INTO my_table (date_input, no_perkara, nama_penggugat, nama_tergugat, no_akta_cerai, kartu_identitas, nomor_identitas, alamat) 
          VALUES ('$dateInput', '$noPerkara', '$namaPenggugat', '$namaTergugat', '$noAktaCerai', '$kartuIdentitas', '$nomorIdentitas', '$alamat')";

  // Execute the SQL statement
  if (mysqli_query($conn, $sql)) {
    echo "Data sudah berhasil disimpan!";
    echo "<meta http-equiv='refresh' content='2;url=/dashboard.php'>";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  // Close the database connection
  mysqli_close($conn);
}

?>
