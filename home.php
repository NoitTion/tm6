<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/1
 * Time: 23:43
 */

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>team6笔记</title>

    <link rel="stylesheet" type="text/css" href="css/home.css">
    <script>
        function change2new(obj){
            var middle1 = document.getElementById("middle1");
            var middle2 = document.getElementById("middle2");
            if(obj.id === 'new'){
                middle1.style.display = "none";
                middle2.style.display = "block";
            } else {
                middle1.style.display = "block";
                middle2.style.display = "none";
            }
        }
    </script>
</head>
<body>
<div id="left"><?php include("left.php")?>  </div>
<div id="middle">
    <div id="middle1"><?php include("notes.php") ?></div>
    <div id="middle2"><?php include("star.php") ?></div>
</div>
<div id="edit"><?php include ("edit.php")?></div>
</body>
</html>
