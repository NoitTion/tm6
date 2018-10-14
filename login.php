<?php
$db_name = "team6_note";
$username = $_POST['username'];
$password = $_POST['password'];

$con = mysqli_connect("localhost","root","root","mysql");
if(!$con){
    die('Could not connect: ' . mysql_error());
}
// 设置编码，防止中文乱码
mysqli_query($con, "set names utf8");

mysqli_select_db($con, $db_name);

$result = mysqli_query($con, "SELECT * FROM user");
if(!$result){
    die('Could not read data');
}

$status = 0;

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){

    if($row['username'] == $username){
        if($row['password'] == $password){
            $turename = $row['username'];
            $status = 1;
            break;
        }
    }
}
mysqli_close($con);

if($status == 1){
    echo "<meta http-equiv='refresh' content='0;note.php'/>";
}
else{
    echo "<meta charset='utf-8'>";
    echo "<script>alert('用户名或密码错误！')</script>";
    echo "<meta http-equiv='refresh' content='0;index.html'/>";
}

?>