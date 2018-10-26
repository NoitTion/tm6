<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cloudnote";
 
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$a = 'fjdk\'lsvxcjo';
$a = mysqli_real_escape_string($conn, $a);
$value = '2';
echo is_numeric($value);
$value = stripslashes($a);
$vc = array(
    'content' => "<p>阿打发'走V型阿道夫噶</p>",
    'createTime' => "2018-10-24 00:53:55",
    'id'=> "142",
    'isShare'=> "0",
    'isStar'=> "0",
    'isdelete'=> "0",
    'listindex'=> 1,
    'markID'=> null,
    'notebookID'=> "1",
    'remindTime'=> null,
    'sharedpeople'=> null,
    'title'=> "小吃v咋发大水发的撒",
    'updateTime'=> "2018-10-26 13:51:2",
    'userid'=>"1");
foreach($vc as $key => $vl){
    if(!is_numeric($vl)){
        $vl = mysqli_real_escape_string($conn, $vl);
    }
}
foreach($vc as $key => $vl){
    if(!is_numeric($vl)){
        $vl = stripslashes($vl);
    }
    print "$key => $vl \n";
}

// echo $a;
// echo $value;