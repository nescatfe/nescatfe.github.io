    <?php
      require_once('database.php');

      // Check if the form is submitted
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the statusperkara value from the form
        $statusperkara = $_POST["statusperkara"];
        
        // Insert the statusperkara value into the database
        $sql = "INSERT INTO statusperkara (status) VALUES ('$statusperkara')";
        if (mysqli_query($conn, $sql)) {
          echo "Status Perkara submitted successfully.";
          echo "<meta http-equiv='refresh' content='0;url=/status/'>";
        } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
      }
      
      // Close the database connection
      mysqli_close($conn);
    ?>
