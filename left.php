<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/10/2
 * Time: 14:15
 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/left.css">
    <script src="js/jquery-3.3.1.js" type="text/javascript"></script>
    <script>
        //查看鼠标是否在某个div里
        function mousenotindiv(div) {
            var y1 = div.offset().top;
            var y2 = y1 + div.height();
            var x1 = div.offset().left;
            var x2 = x1 + div.width();
            return x < x1 || x > x2 || y < y1 || y > y2;
        }
        $(document).ready(function () {
            arrs = $("div").filter('.hover_wrap').toArray();
            divs = Array();
            for (var i = 0; i < arrs.length; ++i) {
                divs.join($(arrs[i]).prev());
            }
            $(document).mousemove(function (e) {
                x = e.pageX;
                y = e.pageY;
                //缓解两个div都出现的bug,仍需要更好的方法,cpu占用较高15%
                for (var i = 0; i < arrs.length; ++i) {
                    var hoverdiv = $(arrs[i]);
                    var div = $(divs[i]);
                    if ((mousenotindiv(hoverdiv) && hoverdiv.css('display') === "block")) {
                        hoverdiv.fadeOut(0, function () {
                            $(this).prev().fadeIn(0);
                        })
                    }
                    if (div.css('display') === 'block' && hoverdiv.css('display') === 'block') {
                        hoverdiv.css('display', 'none');
                    }
                }
            });

            var duringTime = 200;
            $("div").filter(".wrap").mouseenter(function () {//TODO:只管star不就行了???
                $(this).fadeOut(50, function () {
                    $(this).next().fadeIn(duringTime);
                });
                $(this).next().mouseleave(function () {
                    $(this).fadeOut(50, function () {
                        $(this).prev().fadeIn(duringTime);
                    })
                })
            });

            function changetonormal() {
                
                $('#star_normal').attr('src', 'img/star_normal.png');
                $('#notes_normal').attr('src', 'img/note_normal.png');
                $('#label_normal').attr('src', 'img/label_normal.png');
                $('#books_normal').attr('src', 'img/books_normal.png');
                $('#new_normal').attr('src', 'img/new_normal.png');

            }

            $('#star').click(function () {
                changetonormal();
                $('#star_normal').attr('src', 'img/star_selected.png');

            });
            $('#notes').click(function () {
                changetonormal();
                $('#notes_normal').attr('src', 'img/notes_selected.png');
            });
            $('#label').click(function () {
                changetonormal();

                $('#label_normal').attr('src', 'img/label_selected.png');
            });
            $('#books').click(function () {
                changetonormal();

                $('#books_normal').attr('src', 'img/books_selected.png');
            });
            $('#new').click(function () {
                changetonormal();
            });
            $('#user_info').click(function(){
                $(location).attr('href', 'logout.php');
            })

            $('.leftTable').click(function () {
                var thatMiddleDiv = $('#middle_' + $(this).attr('id'));
                // if($(this).attr('id') === 'star')
                //     return;
                $('.middles').each(function () {
                    if ($(this).css('display') === 'block' && $(this).attr('id') !== thatMiddleDiv.attr('id'))
                        $(this).fadeOut(0);
                });
                //console.log('#middle_' + $(this).attr('id'));
                thatMiddleDiv.fadeIn(250);
                $('.listScroll').each(function(){
                    $(this).css('height', $(window).height() - $(this).offset().top);
                })
            })
        });

    </script>

        </head>
<body>
    <div id="main_div">
        <div id="logo">
            <img src="img/logo.png" id="logo_img">
        </div>
<!--        这个可以转换四个页面-->
<!--        <div id="new" onclick="change2new(this)">-->
<!--        2018年10月3日10:39:35 动画可以用,比较难显示bug-->
        <div id="new">
            <div id="new_wrap" class="wrap"><img src="img/new_normal.png" id="new_normal"></div>
            <div id="new_hover_wrap" class="hover_wrap"><img src="img/new_hover.png" id="new_hover"></div>
        </div>

        <div id="star" class="leftTable">
            <div id="star_wrap" class="wrap"><img src="img/star_normal.png" id="star_normal"></div>
            <div id="star_hover_wrap" class="hover_wrap"><img src="img/star_hover.png" id="star_hover"></div>
        </div>

        <div id="notes" class="leftTable">
            <div id="notes_wrap" class="wrap"><img src="img/note_normal.png" id="notes_normal"></div>
            <div id="notes_hover_wrap" class="hover_wrap"><img src="img/note_hover.png" id="note_hover"></div>
        </div>
        <div id="books" class="leftTable">
            <div id="books_wrap" class="wrap"><img src="img/books_normal.png" id="books_normal"></div>
            <div id="books_hover_wrap" class="hover_wrap"><img src="img/books_hover.png" id="books_hover"></div>
        </div>
        <div id="label" class="leftTable">
            <div id="label_hover" class="wrap"><img src="img/label_normal.png" id="label_normal"></div>
            <div id="label_hover_wrap" class="hover_wrap"><img src="img/label_hover.png" id="label_hover"></div>
        </div>

        <div id="user_info" class="left_User_info">
            <div id="user_img"><img src="img/user_info.png"> </div>
        </div>
    </div>
</body>
</html>
