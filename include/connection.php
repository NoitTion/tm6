<?php
/**
* Created by PhpStorm.
* User: admin
* Date: 2018/10/5
* Time: 20:13
*/
require_once 'constants.php';

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if($connection->connect_error){
die("连接失败" . $connection->connect_error);
}
//echo "连接成功";
$connection->query("set names utf8");

?>