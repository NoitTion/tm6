<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/2
 * Time: 15:00
 */
?>


</<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>Document</title>
    <link rel="stylesheet" href="css/notes.css" type="text/css">
    <script type="text/javascript">
        $(window).ready(function () {
            var winHeight = $(window).height();//winHeight即浏览器高度
            var menuHeight = $("#notes_list").offsetHeight;//菜单高度;其中menu_div为菜单所在标签的id
            if(menuHeight<winHeight){
                $("#notes_list").css("height",winHeight);
            }
            else if(menuHeight>=winHeight){
                $("#notes_list").css("height",auto);
            }
        })
    </script>
</head>
<body id="note_true_body">
    <div id="note_body">
        <div id="note_title"><span id="title_content" class="canoselected lead">笔记</span></div>
        <div id="option">
            <p id="notes_num" class="notes_num canoselected">4条笔记</p>
            <div class="dropdown optionTab">
                <button type="button" class="btn dropdown-toggle" id="dropDownOption" data-toggle="dropdown" style="background-color: white">选项
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropDownOption">
                    <li role="presentation" class="dropdown-header">排序方式</li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="1" href="#">创建日期(最早)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="2" href="#">创建日期(最新)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="3" href="#">更新日期(最新)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="4" href="#">更新日期(最早)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="5" href="#">标题(升序)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="6" href="#">标题(降序)</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr class="clear">
        <div id="note_list_wrap">
        <div id="notes_list">
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
            <p>fdsjlkfd</p>
        </div>
        </div>
    </div>
</body>
</html>
