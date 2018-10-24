<?php
//new and update note book label //comments
//
require_once "../include/session.php";

require_once '../include/connection.php';

// confirm_logged_in();
// $userid = $_SESSION['user_id'];
$userid = 1;
$data = $_POST['data'];
$type = $_POST['type'];
$query = '';

function ssttrr($str){
    return '\''.$str.'\'';
}

function update($type, $data){
    global $query;
    
    if($type == 'newnote'){
        if($data['content'] == ''){
            $data['content'] = '\'\'';
        }
        if($data['markID'] == ''){
            $data['markID'] = 'null';
        }
        $query = 'insert into note (userid
                , title
                , content
                , createTime
                , updateTime
                , markID
                , notebookID
                , remindTime
                , isStar
                , isShare
                , isdelete
                , sharedpeople
                )'.
                'values('.
                $data['userid'].
                ', \''.$data['title'].
                '\', \''.$data['content'].
                '\', '.$data['createTime'].
                ', '.$data['updateTime'].
                ','.$data['markID'].
                ', '.$data['notebookID'].
                ', '.$data['remindTime'].
                ', '.$data['isStar'].
                ', '.$data['isShare'].
                ', '.$data['isdelete'].
                ', '.$data['sharedpeople'].');';
    }
    else if($type == 'updatenote'){
        if($data['content'] == ''){
            $data['content'] = '\'\'';
        }
        if($data['markID'] == ''){
            $data['markID'] = 'null';
        }
        $nullstr = 'null';
        if($data['remindTime'] == '')
        {
            $data['remindTime'] = $nullstr;
        }
        if($data['updateTime'] == ''){
            $data['updateTime'] = $nullstr;
        }
        if($data['sharedpeople'] == ''){
            $data['sharedpeople'] = $nullstr;
        }else{
            strstr($data['sharedpeople']);
        }
        
        $query = 'update note set title=\''.$data['title'].
        '\', content=\''.$data['content'].
        '\', notebookID = '.$data['notebookID'].
        ', updateTime = '.$data['updateTime'].
        ', remindTime='.$data['remindTime'].
        ', isStar='.$data['isStar'].
        ', markID='.$data['markID'].
        ', isShare='.$data['isShare'].
        ', sharedpeople='.$data['sharedpeople'].
        ' where id = ' .$data['id'];
    }
    else if($type == 'newbook'){
        $query = 'insert into notebook (
                    userid, 
                    bookName, 
                    isShare, 
                    isdelete, 
                    createTime,
                    updateTime,
                    isStar, 
                    noteNumber,
                    sharedpeople)'.
                  'values'.'('.
                     $data['userid'].
                ', \''.$data['bookName'].
                '\', '.$data['isShare'].
                ', '.$data['isdelete'].
                ', '.$data['createTime'].
                ', '.$data['updateTime'].
                ', '.$data['isStar'].
                ', '.$data['noteNumber'].
                ', '.$data['sharedpeople'].')';
    }else if($type == 'updatebook'){
        $query = 'update notebook set'.
        ' bookName=\''.$data['bookName'].
        '\', isStar='.$data['isStar'].
        ', isdelete='.$data['isdelete'].
        ', isShare='.$data['isShare'].
        ', sharedpeople=\''.$data['sharedpeople'].
        '\', noteNumber='.$data['noteNumber'].        
        ' where id = ' .$data['id'];
    }else if($type == 'newmark'){
        $query = 'insert into mark (
            userid, 
            markName, 
            isdelete, 
            createTime,
            updateTime,
            isStar,
            notesnum)'.
          'values('.
             $data['userid'].
        ', \''.$data['markName'].
        '\', '.$data['isdelete'].
        ', '.$data['createTime'].
        ', '.$data['updateTime'].
        ', '.$data['isStar'].
        ', '.$data['notesnum'].')';
    }else if($type == 'updatemark'){
        $query = 'update mark set '.
        '  markName=\''.$data['markName'].
        '\', isStar='.$data['isStar'].
        ', isdelete='.$data['isdelete'].
        ', notesnum='.$data['notesnum'].        
        ' where id = ' .$data['id'];
    }
}
update($type, $data);
$result = mysqli_query($connection, $query);

// print_r($data);
// echo $query;
// echo '\n' . $result;

$query = 'SELECT LAST_INSERT_ID()';
$result = mysqli_query($connection, $query);
$row = mysqli_fetch_array($result);

echo $row[0];

?>