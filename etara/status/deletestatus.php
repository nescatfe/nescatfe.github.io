<?php
	require_once('database.php');

	// Get the ID of the status to delete from the form data
	$id = $_POST["id"];
	
	// Run a DELETE query to remove the status from the table
	$sql = "DELETE FROM statusperkara WHERE id = $id";
	if (mysqli_query($conn, $sql)) {
		echo "Status deleted successfully.";
		echo "<meta http-equiv='refresh' content='0;url=/status/'>";
	} else {
		echo "Error deleting status: " . mysqli_error($conn);
	}
	
	// Close the database connection
	mysqli_close($conn);

?>