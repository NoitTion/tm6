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
    <!-- <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
    <link rel="stylesheet" href="css/stars.css" type="text/css">

<!-- 不能重复引用,主页面的时候删掉 -->
    <script>
        $(document).ready(function () {
            
        });
    </script>
</head>

<body>
    <div id="star_body">
        <div id="middle_top">
            <div id="stars_title"><span id="title_content" class="canoselected lead">快捷方式</span></div>
        </div>
        <div class='clear'></div>
        <hr/>

        <div id="stars_list">

            <div id="starid_1" class="star_single">
                <span class="glyphicon glyphicon-book pull-left">&nbsp</span>
                <div id="star_name" class="pull-left">xm1d</div>
                <span class="glyphicon glyphicon-remove-circle pull-right"></span>
                <div class="clear"></div>
            </div>

            <div id="starid_1" class="star_single">
                <span class="glyphicon glyphicon-file pull-left">&nbsp</span>
                <div id="star_name" class="pull-left">xm1d</div>
                <span class="glyphicon glyphicon-remove-circle pull-right"></span>
                <div class="clear"></div>
            </div>

            <div id="starid_1" class="star_single">
                <span class="glyphicon glyphicon-bookmark pull-left">&nbsp</span>
                <div id="star_name" class="pull-left">xm1d</div>
                <span class="glyphicon glyphicon-remove-circle pull-right"></span>
                <div class="clear"></div>
            </div>

        </div>
    </div>

</body>
</html>