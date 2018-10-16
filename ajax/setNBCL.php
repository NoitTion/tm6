<?php
//new and update note book label //comments
require_once '../include/connection.php';
// if(isset($_SESSION['userid']))
//$userid = $_SESSION['userid'];
//else
//echo 'error, please login first'
//
$userid = 1;
$data = $_POST['data'];
$type = $_POST['type'];
$query = '';
function update($type){
    if($type == 'newnote'){
        $query = 'insert into note (userid
                , title
                , content
                , createTime
                , notebookID
                , remindTime
                , isStar
                , isShare
                , isdelete
                , sharedpeople
                )'.
                'values('.
                $data['userid'].
                ', '.$data['title'].
                ', '.$data['content'].
                ', '.$data['createtime'].
                ', '.$data['markID'].
                ', '.$data['notebookID'].
                ', '.$data['remindTime'].
                ', '.$data['isStar'].
                ', '.$data['isShare'].
                ', '.$data['isdelete'].
                ', '.$data['sharedpeople'].')';
    }
    else if($type == 'updatenote'){
        $query = 'update note set title='.$data['title'].
        ', content='.$data['content'].
        ', notebookID = '.$data['notebookID'].
        ', remindTime='.$data['remindTime'].
        ', isStar='.$data['isStar'].
        ', isShare='.$data['isShare'].
        'sharedpeople='.$data['sharedpeople'].
        ' where id = ' .$data['id'];
    }
    else if($type == 'newbook'){
        $query = 'insert into notebook (
                    userid, 
                    bookName, 
                    isShare, 
                    isdelete, 
                    createTime,
                    updateTime
                    isStar, 
                    sharedpeople)'.
                  'values'.'('.
                     $data['userid'].
                ', '.$data['bookName'].
                ', '.$data['isShare'].
                ', '.$data['isdelete'].
                ', '.$data['createTime'].
                ', '.$data['updateTime'].
                ', '.$data['isStar'].
                ', '.$data['noteNumber'].
                ', '.$data['sharedpeople'].')';
    }else if($type == 'updatebook'){
        $query = 'update notebook set '.
        '  title='.$data['title'].
        ', isStar='.$data['isStar'].
        ', isdelete='.$data['isdelete'].
        ', isShare='.$data['isShare'].
        ', sharedpeople='.$data['sharedpeople'].
        ', noteNumber='.$data['noteNumber'].        
        ' where id = ' .$data['id'];
    }else if($type == 'newmark'){
        $query = 'insert into mark (
            userid, 
            markName, 
            isdelete, 
            createTime,
            updateTime,
            isStar,
            notesnum'.
          'values('.
             $data['userid'].
        ', '.$data['markName'].
        ', '.$data['isdelete'].
        ', '.$data['createTime'].
        ', '.$data['updateTime'].
        ', '.$data['isStar'].
        ', '.$data['noteNumber'].
        ', '.$data['sharedpeople'].')';
    }else if($type == 'updatemark'){
        $query = 'update mark set '.
        '  markname='.$data['markname'].
        ', isStar='.$data['isStar'].
        ', isdelete='.$data['isdelete'].
        ', noteNumber='.$data['noteNumber'].        
        ' where id = ' .$data['id'];
    }
}
$result = mysqli_query($connection, $query);
echo $result;


?>