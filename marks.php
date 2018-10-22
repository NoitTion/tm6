<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/8
 * Time: 20:23
 */
?>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/marks.css" type="text/css">
    <!-- <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
    <!--    不能重复引用,主页面的时候删掉-->
</head>
<body>
    <div id="mark_body">
        <div id="middle_top">
        <div id="marks_title"><span id="title_content" class="canoselected lead">标签</span></div>
        </div>

        

        <hr class="clear">

        <div id="marks_list" class="listScroll">

            <div id="mark_wrap">
                <div id="markid_1" class="mark">
                    <div class="mark_name">
                    mark_name
                    </div>
                    <div class="mark_note_num">
                    23
                    </div>
                </div>
                <div id="mark_operate">
                    <span class="glyphicon glyphicon-star mark_smallicon pull-left"></span>
                    <span class="glyphicon glyphicon-pencil mark_smallicon pull-left"></span>
                    <span class="glyphicon glyphicon-trash mark_smallicon pull-left"></span>
                </div>
                
            </div>
            

            </div>
        </div>
    </div>
</body>
</html>
