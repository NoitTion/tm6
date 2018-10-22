<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/5
 * Time: 20:07
 */
require_once "../include/session.php";
require_once '../include/connection.php';
//session_start();
// confirm_logged_in();
// $userid = $_SESSION['user_id'];
$userid = 1;

$query = 'select * from note where userid = ' . $userid;
$result = mysqli_query($connection, $query);
$rows = [];
while ($row = mysqli_fetch_assoc($result)){
    $rows[]=$row;
}
echo json_encode($rows);
//echo '<script language=\"JavaScript\" type=\"text/JavaScript\">notes_json = '. json_encode($rows). '</script>;'
?>