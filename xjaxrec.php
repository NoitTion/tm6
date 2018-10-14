<!-- 及时提示用户名是否被注册 -->
<?php 
include 'xajax_core/xajax.inc.php'; 
$xajax = new xajax();
//首先在xajax声明一个check函数 
$xajax -> registerFunction("check");
//这个check函数需要前台传来用户名username 
function check($username){ 
    $orps = new xajaxResponse();
    //连接数据库，看看用没有这个用户名
    $con = mysqli_connect("localhost", "root", "root", "mysql"); 
    if(!$con){
        die('Could not connect: ' . mysql_error());
    }
    mysqli_select_db($con, "team6_note");
    $dbusername=null;
    $result = mysqli_query("SELECT * FROM user");
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){ 
        $dbusername = $row["username"];
    }
    // 查找不到用户名的话，dbusername仍为空
    if(is_null($dbusername)){
        $orps -> alert("恭喜，该用户名未被占用，可以注册");
        $orps -> clear("submitbtn","disabled");
    }
    else{
    //否则弹窗之后为submitbtn上锁，加上disabled属性 
        $orps -> alert("该用户名已被占用，请更换被的用户名");
        $orps -> assign("submitbtn","disabled","disabled");
    }
    //人走带门，然后是三个xajax的指定动作 
    mysql_close($con);
    return $orps;
 }
 
$xajax -> processRequest();
$xajax -> printJavascript();
?>