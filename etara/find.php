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
    $noPerkara = $_POST['noperkara'];

    // Prepare the SQL statement
    $sql = "SELECT * FROM my_table WHERE no_perkara = '$noPerkara'";

    // Execute the SQL statement
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        include 'menu-bar.php';
        include 'cari.html';
        // Output data of each row
        echo "<table>";
        echo "<tr><th>Date Input</th><th>No. Perkara</th><th>Nama Penggugat</th><th>Nama Tergugat</th><th>No. Akta Cerai</th><th>Kartu Identitas</th><th>Nomor Identitas</th><th>Alamat</th></tr>";
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $row['date_input'] . "</td>";
            echo "<td>" . $row['no_perkara'] . "</td>";
            echo "<td>" . $row['nama_penggugat'] . "</td>";
            echo "<td>" . $row['nama_tergugat'] . "</td>";
            echo "<td>" . $row['no_akta_cerai'] . "</td>";
            echo "<td>" . $row['kartu_identitas'] . "</td>";
            echo "<td>" . $row['nomor_identitas'] . "</td>";
            echo "<td>" . $row['alamat'] . "</td>";
            echo "<td>";
            echo "<form method='post' action='delete.php'>";
            echo "<input type='hidden' name='id' value='" . $row['id'] . "'>";
            echo "<button type='submit' name='delete' class='btn btn-danger'>Delete</button>";
            echo "</form>";
            echo "</td>";
            echo "</tr>";
            
        }
        echo "</table>";
    } else {
        echo "<meta http-equiv='refresh' content='3;/data-masuk.php'>";
        echo "Data tidak ditemukan. Anda akan otomatis kembali";
    }

    // Close the database connection
    mysqli_close($conn);
}

?>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px;
    }
    
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    
    th {
        background-color: #f2f2f2;
        text-align: left;
    }
    
</style>