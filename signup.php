<?php
$db_name = "team6_note";
$username = trim($_POST['username']);
$password = $_POST['password'];

$con = mysqli_connect("localhost","root","root","mysql");
if(!$con){
    die('Could not connect: ' . mysql_error());
}
// 设置编码，防止中文乱码
mysqli_set_charset($con,"utf8");
// mysqli_query($con, "set names utf8");

mysqli_select_db($con, $db_name);

mysqli_query($con, "INSERT INTO user(username, password) VALUES ('$username', '$password')");

mysqli_close($con);

echo "<meta charset='utf-8'>";
echo "<script>alert('登陆你的账号吧！')</script>";
echo "<meta http-equiv='refresh' content='0;index.html'/>";
?>