<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $pubkey = $_POST['pubkey'];
    $email = $_POST['email'];
    $nostr_username = $_POST['nostr_username'];
    $twitter_username = $_POST['twitter_username'];

    $data = "$pubkey, $email, $nostr_username, $twitter_username\n";
    $file = fopen('user_info.txt', 'a');
    fwrite($file, $data);
    fclose($file);

    echo "Information saved successfully!";
  }
?>