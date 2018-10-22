<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/8
 * Time: 0:13
 */

require_once '../include/session.php';
require_once '../include/connection.php';
//session_start();
// confirm_logged_in();
// $userid = $_SESSION['user_id'];

$id = $_GET['id'];
$action = $_GET['action'];
$userid = 1;

if($action == 'note') {
    $query = 'update note set isdelete=1 where id = ' . $id;
}
else if($action == 'book'){
    $query = 'update notebook set isDelete=1 where id = ' . $id;
}
$result = mysqli_query($connection, $query);

echo $result;
?>