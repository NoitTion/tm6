<?php
require_once '../include/session.php';
confirm_logged_in();

echo $_SESSION['user_id'];


?>