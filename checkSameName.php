<?php
$db_name = "team6_note";
$username = $_GET['username'];

$con = mysqli_connect("localhost","root","root","mysql");
if(!$con){
    die('Could not connect: ' . mysql_error());
}
// 设置编码，防止中文乱码
mysqli_set_charset($con,"utf8");
// mysqli_query($con, "set names utf8");

mysqli_select_db($con, $db_name);

$result = mysqli_query($con, "SELECT * FROM user");
if(!$result){
    die('Could not read data');
}

$status = 0;

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    if($row['username'] == $username){
        $response = "用户名已被使用，换一个吧";
        $status = 1;
        break;
    }
}
if (!$status){
    $response = "";
}

mysqli_close($con);

echo $response;

?>