<?php
//new and update note book label //comments
//
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
function update($type, $data){
    global $query;
    if($type == 'newnote'){
        $query = 'insert into note (userid
                , title
                , content
                , createtime
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
                '\', '.$data['content'].
                ', '.$data['createtime'].
                ', \''.$data['markID'].
                '\', '.$data['notebookID'].
                ', '.$data['remindTime'].
                ', '.$data['isStar'].
                ', '.$data['isShare'].
                ', '.$data['isdelete'].
                '\', '.$data['sharedpeople'].'\')';
    }
    else if($type == 'updatenote'){
        $nullstr = 'null';
        if($data['remindTime'] == '')
        {
            $data['remindTime'] = $nullstr;
        }
        if($data['updateTime'] == ''){
            $data['updateTime'] = $nullstr;
        }
        $query = 'update note set title=\''.$data['title'].
        '\', content=\''.$data['content'].
        '\', notebookID = '.$data['notebookID'].
        ', updateTime = '.$data['updateTime'].
        ', remindTime='.$data['remindTime'].
        ', isStar='.$data['isStar'].
        ', isShare='.$data['isShare'].
        ', sharedpeople=\''.$data['sharedpeople'].
        '\' where id = ' .$data['id'];
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
                ', \''.$data['sharedpeople'].'\')';
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
            notesnum,
            sharedpeople,'.
          'values('.
             $data['userid'].
        ', \''.$data['markName'].
        '\', '.$data['isdelete'].
        ', '.$data['createTime'].
        ', '.$data['updateTime'].
        ', '.$data['isStar'].
        ', '.$data['notesnum'].
        ', \''.$data['sharedpeople'].'\')';
    }else if($type == 'updatemark'){
        $query = 'update mark set '.
        '  markName=\''.$data['markName'].
        '\', isStar='.$data['isStar'].
        ', isdelete='.$data['isdelete'].
        ', notesnum='.$data['notesnum'].        
        ' where id = ' .$data['id'];
    }
}
print_r($data);
update($type, $data);
echo $query;
$result = mysqli_query($connection, $query);
echo '\n' . $result;


?>