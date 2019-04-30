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
    <link rel="stylesheet" href="css/books.css" type="text/css">
    <script src="js/jquery.min.js"></script>


</head>
<body>
    <div id="book_body">
        <div id="middle_top">
        <div id="books_title"><span id="title_content" class="canoselected lead">笔记本</span></div>
        <div id="add_book"><span class="glyphicon glyphicon-plus"></span></div>
        <hr class="clear">
        </div>

        <div id="book_search_div">
            <input type="text" class="form-control center-block" id="book_search" placeholder="search">
        </div>
        <hr class="clear">
        <div id="books_list" class="listScroll">
           <div id="book_' + this.books[i]['id'] + '" class="book">
               <span id="book_title">tilte</span>
               <span class="glyphicon glyphicon-trash pull-right smallicon trash" style="color: rgb(255, 255, 255);"/>' 
               <span class="glyphicon glyphicon-star-empty pull-right smallicon star" style="color: rgb(255, 255, 255);"/>'
               <br>
               <p id="book_num">个笔记
            </div>
           <hr>

            <div id="trash">
                <span class="glyphicon glyphicon-trash" style="color: rgb(173, 173, 173);"> 废纸篓</span>
                <span id="trash_num">0</span>
            </div>
        </div>
    </div>

<div id="booksscript" style="display: none"></div>
</body>
</html>
