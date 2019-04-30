<?php

require_once "../include/session.php";
require_once '../include/connection.php';
// if(isset($_SESSION['userid'])){
confirm_logged_in();
$userid = $_SESSION['user_id'];
// }
// else
// echo 'error, please login first';

// $userid = 1;
    /**
     * 
     * @param {note, notebook, mark} action 
     * @param {num} id 
     * @param {func} func 
     */

function getinfo($tab, $connection, $userid, $id){
    $query = 'delete from ' . $tab . ' where userid = ' . $userid .' and id='.$id;
    $result = mysqli_query($connection, $query);
    echo $query;
    echo '\n' . $result;
}


if(isset($_POST['type'])){
//    $id = $_SESSION['userid'];
    $action = $_POST['type'];
    $itemId = $_POST['data'];
    echo $action;
    // $action = 'notebook';
    // $itemId = '18';

    getinfo($action, $connection, $userid, $itemId);

}
?>