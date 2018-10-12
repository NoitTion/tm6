<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/8
 * Time: 22:19
 * get notes or books or labels(marks) or comments
 */

require_once '../include/connection.php';
//$userid = $_SESSION['userid'];
$userid = 1;

function getinfo($tab, $connection, $userid){
    $query = 'select * from ' . $tab . ' where userid = ' . $userid;
    $result = mysqli_query($connection, $query);
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)){
        $rows[]=$row;
    }
    echo json_encode($rows);
}


if(isset($_POST['action'])){
//    $id = $_SESSION['userid'];
    $action = $_POST['action'];
    $id = '1';
    getinfo($action, $connection, $userid);

}