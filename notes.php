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
        $(window).resize(function(){
            $('#notes_list').css('height', $(window).height() - $('#middle_top').height() - 54)
        });

        $(window).ready(function () {
            notesarr = "";
            $('#notes_list').css('height', $(window).height() - $('#middle_top').height() - 54 );

            var xmlhttp;
            function loadXMLDoc(url,cfunc)
            {
                if (window.XMLHttpRequest)
                {// IE7+, Firefox, Chrome, Opera, Safari 代码
                    xmlhttp=new XMLHttpRequest();
                }
                else
                {// IE6, IE5 代码
                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange=cfunc;
                xmlhttp.open("POST",url,true);

                xmlhttp.send();
            }
            function getAllNotes(notes)
            {
                loadXMLDoc("ajax/getAllnotes.php",function()
                {
                    if (xmlhttp.readyState===4 && xmlhttp.status===200)
                    {
                        //$('#notesscript').html(xmlhttp.responseText);
                        // notes.getnotes($.parseJSON(xmlhttp.responseText));
                        var nnotes = $.parseJSON(xmlhttp.responseText);
                        notes.getnotes(nnotes);
                        notes.print2NoteList();

                    }
                });
            }
            function Notes() {
                this.getnotes = function (notes) {
                    this.notes = notes;
                };
                this.print2NoteList = function() {
                    console.log(this.notes);
                    for(i = 0;i < this.notes.length;++i) {
                        $('#notes_list').html($('#notes_list').html() + '<div id="note_1" class="note">' +
                            '<span id="note_title">' + this.notes[i]['title']+ '</span>' +
                            '<span class="glyphicon glyphicon-trash pull-right smallicon" style="color: rgb(255, 255, 255);"></span>' +
                            '<span class="glyphicon glyphicon-star-empty pull-right smallicon" style="color: rgb(255, 255, 255);"></span>' +
                            '<br>' +
                            '<p id="note_excerpt">' + this.notes[i]['content'] +
                            '</div>' +
                            '<hr>');
                    }
                    lightit();

                }
            }
            function Books(books) {
                this.books = books;
                this.notes.push(note);
                this.print_notes = function () {
                    var i = 0;
                    for (i = 0; i < this.notes.length; ++i) {
                        this.notes[i].print();
                    }
                };
            }
            var notes = new Notes();
            getAllNotes(notes);


            //要放下面
            function lightit() {
                $('.glyphicon-star-empty').hover(function () {
                    $(this).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                }, function () {
                    $(this).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                });
                $('.glyphicon-trash').hover(function () {
                    $(this).removeClass('glyphicon-trash').addClass('glyphicon-remove');
                }, function () {
                    $(this).removeClass('glyphicon-remove').addClass('glyphicon-trash');
                });
            }
        });

    </script>
</head>
<body id="note_true_body">
    <div id="note_body">
        <div id="middle_top">
        <div id="notes_title"><span id="title_content" class="canoselected lead">笔记</span></div>
        <div id="option">
            <p id="notes_num" class="notes_num canoselected">4条笔记</p>
            <div class="dropdown optionTab">
                <button type="button" class="btn dropdown-toggle" id="dropDownOption" data-toggle="dropdown" style="background-color: white">选项
                    <span class="caret"/>
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
        </div>
        <hr class="clear">

        <div id="notes_list">
            <div id="note_1" class="note">
                <span id="note_title">标题</span>
                <span class="glyphicon glyphicon-trash  pull-right smallicon" style="color: rgb(255, 255, 255);"></span>
                <span class="glyphicon glyphicon-star-empty pull-right smallicon" style="color: rgb(255, 255, 255);"></span>
                <br>
                <p id="note_excerpt">部分内容aaaaaaaaa</p>
            </div>
            <hr>
<!---->
<!--            <div id="note_1" class="note">-->
<!--                <span id="note_title">标题</span>-->
<!--                <span class="glyphicon glyphicon-trash pull-right smallicon" style="color: rgb(255, 255, 255);"></span>-->
<!--                <span class="glyphicon glyphicon-star-empty pull-right smallicon" style="color: rgb(255, 255, 255);"></span>-->
<!--                <br>-->
<!--                <p id="note_excerpt">部分内容aaaaaaaaa</p>-->
<!--            </div>-->
<!--            <hr>-->
<!---->
        </div>
    </div>

<div id="notesscript" style="display: none"></div>
</body>
</html>
