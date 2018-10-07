<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/8
 * Time: 0:13
 */

require_once '../include/connection.php';

//session_start();
//$userid = $_SESSION['userid'];
$noteid = $_GET['id'];
$userid = 1;

$query = 'update note set isdelete=1 where id = '.$noteid;

$result = mysqli_query($connection, $query);
echo $result;
//echo '<script language=\"JavaScript\" type=\"text/JavaScript\">notes_json = '. json_encode($rows). '</script>;'
?>