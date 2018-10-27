<?php

require_once "../include/session.php";
require_once '../include/connection.php';
// if(isset($_SESSION['userid']))
// confirm_logged_in();
// $userid = $_SESSION['user_id'];
//else
//echo 'error, please login first
//
$userid = 1;
    /**
     * 
     * @param {note, notebook, mark} action 
     * @param {num} id 
     * @param {func} func 
     */

function getinfo($tab, $connection, $userid){
    $query = 'delete from ' . $tab . ' where userid = ' . $userid .' and id='.$id;
    $result = mysqli_query($connection, $query);
    echo $result;
}


if(isset($_POST['action'])){
//    $id = $_SESSION['userid'];
    $action = $_POST['action'];
    $itemId = $_post['data'];
    $id = '1';
    getinfo($action, $connection, $userid, $itemId);

}
?>