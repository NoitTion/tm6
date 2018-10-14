<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/6
 * Time: 7:55
 */
//
header("Content-Type: text/html; charset=UTF-8");


require_once '../include/connection.php';

//$userid = $_SESSION['userid'];
$userid = 1;

$query = 'select * from note where userid = ' . $userid;
$result = mysqli_query($connection, $query);
$rows = array();
while($row = mysqli_fetch_assoc($result)){//只返回字符索引,fetch_array也返回数字索引
    $rows[]=$row;
}

$arr = array("username"=>"tion", "passwrod"=>"4399943");
echo print_r($rows) . '<br/>';
echo json_encode(($rows)).'<br/><br/>';
echo '<br/><br/>' . print_r($arr);

?>

</<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script>
        var  a = "";
        function acc(){
            a = 2;
        }
        acc();
        alert(a);
    </script>
</head>
<body>

</body>
</html>
