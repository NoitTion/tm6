<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/2
 * Time: 15:00
 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!--    <script src="js/jquery.min.js"></script>-->
<!--    <script src="js/bootstrap.min.js"></script>-->
    <title>Document</title>
    <link rel="stylesheet" href="css/item.css" type="text/css">
    <script type="text/javascript" src="js/NBLS.js"></script>
</head>
<body id="item_true_body">
    <div id="item_body">
        <div id="middle_top">
        <div id="items_title"><span id="title_content" class="canoselected lead" style="font-size: 23px">笔记</span></div>
        <div id="option">
            <p id="items_num" class="items_num canoselected">0条笔记</p>
            <div class="dropdown optionTab">
                <button type="button" class="btn dropdown-toggle" id="dropDownOption" data-toggle="dropdown" style="background-color: white">选项
                    <span class="caret"/>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropDownOption">
                    <li role="presentation" class="dropdown-header">排序方式</li>
<!--                    //updateAsc,updateDec,createAsc,updateDec,nameAsc,nameDec;-->
                    <li role="presentation">
                        <a role="menuitem" tabindex="1" href="#" class="sortfor" id="createAsc">创建日期(最早)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="2" href="#" class="sortfor" id="createDec">创建日期(最新)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="3" href="#" class="sortfor" id="updateDec">更新日期(最新)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="4" href="#" class="sortfor" id="updateAsc">更新日期(最早)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="5" href="#" class="sortfor" id="nameAsc">标题(升序)</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="6" href="#" class="sortfor" id="nameDec">标题(降序)</a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        <hr class="clear">

        <div id="items_list" class="listScroll">
<!--            <div id="itemid_n" class="item clicked">-->
<!--                <span id="item_title">标题</span>-->
<!--                <span class="glyphicon glyphicon-trash  pull-right smallicon" style="color: rgb(255, 255, 255);"></span>-->
<!--                <span class="glyphicon glyphicon-star-empty pull-right smallicon" style="color: rgb(255, 255, 255);"></span>-->
<!--                <br>-->
<!--                <p id="item_excerpt">部分内容aaaaaaaaa</p>-->
<!--            </div>-->
<!--            <hr>-->
<!---->
        </div>
    </div>
</body>
</html>
