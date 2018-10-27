<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/1
 * Time: 23:43
 */
require_once 'include/session.php';
// echo $_SESSION['user_id'];
confirm_logged_in();

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>team6笔记</title>
    <link rel="stylesheet" type="text/css" href="css/home.css">
    <script language=javascript src="js/functions.js"></script>
</head>
<body>
    <div id="mask">
        <div id="CreateBox">
            <div id="CreateBox_remind">
                <div id="CreateBox_center">
                    <span class="glyphicon glyphicon-book" style="color: rgb(190, 189, 185);"></span>
                    <br>
                    <p id="Create_name">创建笔记本</p>
                    <hr class="createbhr">
                    <input type="text" id="Create_input" spellcheck="false" placeholder="给笔记本起个名字">
                    <br><br>
                    <br><br>

                    <div id="Create_button">
                        <a id="Create_cancel">取消</a>
                        <a id="CreateComplete" class="Create_complete" style="text-decoration:none;color: #606060;">完成</a>

                    </div>
                </div>
            </div>
        </div>
    </div>

<div id="left"><?php include "left.php"?>  </div>
<div id="middle">
    <div id="middle_star" class="middles"><?php include "star.php"?></div>
    <div id="middle_notes" class="middles"><?php include "notes.php"?></div>
    <div id="middle_books" class="middles"><?php include "books.php"?></div>
    <div id="middle_label" class="middles"><?php include "marks.php"?></div>
</div>
<div id="edit"><?php include "tinymce.php"?></div>

</body>
</html>
