//for item(note), book, label, star
document.write('<script language=javascript src="js/functions.js"></script>');

lastclicktip = '#itemid_0'; //上一次item被点击的id

$(window).resize(function () {
    $('.listScroll').css('height', $(window).height() - $('#items_list').offset().top) //给scroll设置高度
});

$(window).ready(function () {
    itemsarr = "";
    $('.listScroll').css('height', $(window).height() - $('#items_list').offset().top);
    var xmlhttp;

    function loadXMLDoc(url, cfunc) {
        if (window.XMLHttpRequest) { // IE7+, Firefox, Chrome, Opera, Safari 代码
            xmlhttp = new XMLHttpRequest();
        } else { // IE6, IE5 代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = cfunc;
        xmlhttp.open("POST", url, true);

        xmlhttp.send();
    }

    function getAllnotes() {
        loadXMLDoc("ajax/getAllnotes.php", function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var nnotes = $.parseJSON(xmlhttp.responseText);
                notes.getnotes(nnotes);
                item.displaylist(); //有延迟啊小老弟
            }
        });
    }


    function Notes() {
        this.getnotes = function (notes) {
            this.notes = notes;
        };

        this.starnote = function (listid, trueid) {
            //TODO server
            trueid = IndexOf(this.notes, 'id', trueid);

            if (this.notes[trueid].isStar === '0') {
                this.notes[trueid].isStar = '1';
                $('#itemid_' + listid + ' .star').addClass('stared');
            } else if (this.notes[trueid].isStar === '1') {
                this.notes[trueid].isStar = '0';
                $('#itemid_' + listid + ' .star').removeClass('stared');
            } else {
                alert('starnote error');
            }
        }

        this.notDelnum = function () {
            var nums = 0;
            for (i = 0; i < this.notes.length; ++i) {
                if (this.notes[i]['isdelete'] === '0') {
                    nums++;
                }
            }
            return nums;
        };
        this.addAnote = function (note) { //新建笔记的时候用
            this.notes.push(note);
        };
        this.deletenote = function (id, thatLabel, r_id) { //从标签那里传过来
            const that = this; //后面的不给传递,要在这里缓存一下
            if (confirm('确认要删除?')) {
                //这里要向服务器端请求删除便签
                $.get("ajax/deleteData.php?id=" + id + '&action=note', function (status) {
                    if (status === '1') {
                        // console.log('note服务器请求删除成功');
                        if (typeof (thatLabel) !== 'undefined')
                            thatLabel.parent().remove();
                        else {
                            $('#noteid' + r_id).remove();
                        }
                        var i = 0;
                        for (i = 0; i < that.notes.length; ++i) {
                            if (that.notes[i]['id'] === id) {

                                that.notes[i]['isdelete'] = '1';
                            }
                        }
                        //that.setnotesnum();

                        // item.getlist(item.reaction);
                        // item.changesort(item.sortfor, 1);//等到服务器回应后才能删除成功
                        item.listrefresh();
                    } else {
                        alert('Error, check out your Internet. ERROR CODE:' + status);
                    }
                });
            }
        };
    }


    function Books() {
        this.notes = notes;
        this.getbooks = function () {
            const that = this;
            $.post("ajax/getNBCL.php", {
                action: 'notebook'
            }, function (data, status) {
                that.books = $.parseJSON(data);
                that.printbooks();
                stars.fresh();//maybe there are more good method
            })
        };
        this.booklength = function (id) {
            var counts = 0;
            for (i = 0; i < this.notes.notes.length; ++i) {

                if (this.notes.notes[i]['notebookID'] === id && this.notes.notes[i]['isdelete'] !== '1') {
                    counts += 1;
                }
            }
            return counts;
        };
        this.printbooks = function () {
            
            $('#books_list').html('');
            that = this;
            for (var i = 0; i < this.books.length; ++i) {
                var isStard = '';
                if(this.books[i].isStar === '1'){
                    isStard = 'glyphicon-star';
                }else{
                    isStard = 'glyphicon-star-empty';

                }
                if (this.books[i]['isdelete'] === '0') {
                    $('#books_list').html($('#books_list').html() +
                        '<div id="book_' + this.books[i]['id'] + '" class="book">' +
                        '<span id="book_title">' + this.books[i]['bookName'] + '</span>' +
                        '<span class="glyphicon glyphicon-trash pull-right smallicon trash" style="color: rgb(255, 255, 255);"/>' +
                        '<span class="glyphicon '+ isStard +' pull-right smallicon star" style="color: rgb(255, 255, 255);"/>' +
                        '<br>' +
                        '<p id="book_num">' + that.booklength(that.books[i]['id']) + '个笔记' +
                        '</div>' +
                        '<hr class = "clear">');
                }
            }
            this.lightBooks();
        };

        this.starbook = function(bookid){
            that = this;
            var index = IndexOf(this.books, 'id', bookid);
            if(this.books[index].isStar === '0'){
                this.books[index].isStar = '1';
                console.log(this.books[index]);
                updateTips('updatebook', this.books[index], function(data, status){
                    console.log(data);
                    console.log(status);
                    if(status !== 'success'){
                        that.isStar = '0';
                        alert("error can't update book")
                    }
                })
            }else if(this.books[index].isStar === '1'){
                this.books[index].isStar = '0';
            }else {
                console.log('known error ');
            }
            //TODO:server
        }

        this.lightBooks = function () {
            $('#books_list .trash').click(function () { //删除笔记,标签,笔记本,星标
                var id = $(this).parent().attr('id');
                id = id.split('_');
                if (id[0] === 'book') {
                    books.deletebook(id[1], $(this));
                }else{
                    alert('unknown action');
                }
                return false; //阻止事件冒泡,阻止事件默认行为
            });
            $('#books_list .star').click(function () {
                var id = $(this).parent().attr('id');
                id = id.split('_');
                if(id[0] === 'book'){
                    books.starbook(id[1]);
                }else{
                    alert('unknown action');
                }

                return false;
              });

            $('#books_list .star').hover(function () {
                $(this).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            }, function () {
                var id = $(this).parent().attr('id').split('_')[1];
                var booksIndex = IndexOf(books.books, 'id', id);
                if(books.books[booksIndex].isStar === '0')
                    $(this).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            });
            
            $('#books_list .glyphicon-trash').hover(function () {
                $(this).removeClass('glyphicon-trash').addClass('glyphicon-remove');
            }, function () {
                $(this).removeClass('glyphicon-remove').addClass('glyphicon-trash');
            });
            $('.book').click(function () {
                var str = $(this).attr('id').split('_')[1];
                item.listinit('book_note_show', str, 1); //通过id要知道真正的id
                $('#middle_books').fadeOut(0);
                $('#middle_notes').fadeIn(200);
            });


        };

        this.deletebook = function (id, thatLabel) { //从标签那里传过来
            const that = this; //后面的不给传递,要在这里缓存一下
            if (confirm('确认要删除这个笔记本?')) {
                //这里要向服务器端请求删除便签
                $.get("ajax/deleteData.php?id=" + id + "&action=book", function (status) {
                    if (status === '1') {
                        delete_page_label(thatLabel); //在网页上删除那个标签
                        for (var i = 0; i < that.books.length; ++i) { //在本地删除那个
                            // 本(set isdeleted 1)
                            if (that.books[i]['id'] === id) {
                                that.books[i]['isdelete'] = '1';
                            }
                        }
                        that.setBooksnums();
                        item.setlist();

                    } else {
                        alert('Error, check out your Internet. ERROR CODE:' + status);
                    }
                });
            }
        };
    }

    function Marks() {
        //actually it's init
        //TODO: deletemark.把所有note里的mark删掉
        this.getmarks = function () {
            const that = this;
            $.post("ajax/getNBCL.php", {
                action: 'mark'
            }, function (data, status) {
                that.marks = $.parseJSON(data);
                // that.printmarks();
                for (var i = 0; i < that.marks.length; ++i) {
                    that.marks[i].print_mark_to = Fprint_mark_to;
                    that.marks[i].star = star;
                    that.marks[i].lightme = lightme;
                    that.marks[i].removemyself = removemyself;
                    that.marks[i].alterName = alterName;
                }
                that.marks.findmarkFrommarks = function (id) { //返回这个id的mark
                    for (var i = 0; i < this.length; ++i) {
                        if (this[i].id === id) {
                            return this[i];
                        }
                    }
                }
                that.printAllmark();
                stars.fresh();//maybe there are more good method
                // that.marks[0].print_mark_to('#marks_list');
            })
        };

        function removemyself() {
            //TODO: send a request to server
            //interface: update(key, content);
            this.isdelete = '1';
            $('#markid_' + this.id).parent().remove();
        }
        this.unstar = function (id){
            var tid = IndexOf(this.marks, 'id', id);
            this.marks[tid].star('0');
        }

        function update(content) {
            //TODO:server

            this.markName = content;

        }

        function star(ooe) { //one or zero '1' or '0'
            if (ooe === '1') {
                //TODO:向服务器发送请求 if success:
                this.isStar = '1';

            } else if (ooe === '0') {
                //TODO:向服务器发送请求 if success:
                this.isStar = '0';

            } else {
                alert(this.id + 'star error');
            }
            //$('#marks_list #markid_' + this.id + ' glyphicon-star').css('color', 'green'); //in lightme()
        }

        function alterName(str) {
            //TODO: server
            this.markName = str;
            $('#markid_' + this.id + '  .mark_name').html(str);
        }

        function lightme() {
            const that = this;

            $('#markid_' + this.id + '+ #mark_operate .glyphicon-star').click(function () { //.glyphicon-star
                if (that.isStar === '0') {
                    $(this).removeClass('mark_smallicon').addClass('mark_smallicon_selected');
                    that.star('1');
                } else if (that.isStar === '1') {
                    $(this).removeClass('mark_smallicon_selected').addClass('mark_smallicon');
                    that.star('0');
                } else {
                    alert('light error');
                }
            });

            $('#markid_' + this.id + '+ #mark_operate .glyphicon-pencil').click(function () {
                var str = prompt("enter your new label name", that.markName); //LADO:jq弹出层插件
                if (str != null && str.trim() !== '') {
                    that.alterName(str);

                }
            });

            $('#markid_' + this.id + '+ #mark_operate .glyphicon-trash').click(function () {
                if (confirm('确认删除标签?')) {
                    that.removemyself();
                }
            });

            $('.mark').click(function () {
                var str = $(this).attr('id').split('_')[1];
                item.listinit('mark_note_show', str, 1); //通过id要知道真正的id
                $('#middle_label').fadeOut(0);
                $('#middle_notes').fadeIn(200);
            });

        }

        function Fprint_mark_to(thatlabel) {
            if (this.isdelete === '1')
                return;
            var isSelected = '';
            if(this.isStar === '1'){
                isSelected = 'mark_smallicon_selected';
            }
            this.namebb = thatlabel;
            $(thatlabel).html($(thatlabel).html() +
                '<div id="mark_wrap">' +
                '    <div id="markid_' + this.id + '" class="mark">' +
                '        <div class="mark_name">' +
                this.markName +
                '        </div>' +
                '        <div class="mark_note_num">' +
                this.notesnum +
                '        </div>' +
                '    </div>' +
                '    <div id="mark_operate">' +
                '        <span class="glyphicon glyphicon-star mark_smallicon pull-left '+ isSelected +'"></span>' +
                '        <span class="glyphicon glyphicon-pencil mark_smallicon pull-left"></span>' +
                '        <span class="glyphicon glyphicon-trash mark_smallicon pull-left"></span>' +
                '    </div>' +
                '    <div id="update_complete">' +
                '        <span class="glyphicon glyphicon-ok mark_smallicon" style="color: rgb(170, 167, 167);"></span>' +
                '    </div>' +
                '</div>'
            )
            //
            // if(this.id != '3')
            //     this.lightme(); 还会被刷掉.....wlgc
        }
        this.printAllmark = function () {
            $('#marks_list').html('');
            for (var i = 0; i < this.marks.length; ++i) {
                this.marks[i].print_mark_to('#marks_list');
            }
            for (var i = 0; i < this.marks.length; ++i) {
                this.marks[i].lightme();
            }
        };
    };


    function Stars() {
        this.list = [];
        this.getstars = function () {
            this.list = [];
            getstarlist(notes.notes, this.list);
            getstarlist(books.books, this.list);
            getstarlist(marks.marks, this.list);
        }
        this.sort = function () {
            this.list.sort(function (a, b) {
                return -Date.parse(a.updateTime) + Date.parse(b.updateTime);
            })
        };
        this.display = function () {
            $('#stars_list').html('');
            
            for(var i = 0;i < this.list.length;++i){
                var iconType = typeofStars(this.list[i]);
                $('#stars_list').html($('#stars_list').html() + 
                '<div id="starid_'+ i +'" class="star_single">'+
                '<span class="glyphicon ' + iconType[1] +' pull-left">&nbsp</span>'+
                '<div id="star_name" class="pull-left">'+ iconType[0] +'</div>'+
                '<span class="glyphicon glyphicon-remove-circle pull-right"></span>'+
                '<div class="clear"></div>'+
                '</div>'
                );
            }
        }
        
        this.fresh = function(){
            this.getstars();
            this.sort();
            this.display();
            this.lightStar();
        }
        this.lightStar = function(){
            const that = this;
            for(var i = 0;i < this.list.length;++i){
                $('#starid_'+ i + ' .glyphicon-remove-circle').click(i, function(event){
                    var i = event.data;
                    console.log('#starid_' + i  +' .glyphicon-remove-circle');
                    console.log(i);

                    that.deletestar(i);
                    $(this).parent().remove();
                });
            }
            $('.star_single').click(function(){
                var str = $(this).attr('id').split('_')[1];
                var type = typeofStars(that.list[str]);
                console.log(type);
                if(type[2] === 'book'){
                    item.listinit('book_note_show', type[3], 1);
                    starHideItemIn();
                }else if(type[2] === 'mark'){
                    item.listinit('mark_note_show', type[3], 1);
                    starHideItemIn();

                }else if(type[2] === 'note'){
                    //TODO: notes.notes[i].display(1);//fullscreen:1 or 0
                    starHideItemIn();

                }
            })
        }
        this.deletestar = function(listid){

            var itemStr = typeofStars(this.list[listid])[2];
            console.log('type of star is ' + itemStr);
            var tid = this.list[listid]['id'];
            if(itemStr === 'book'){
                books.starbook(tid);
            }else if(itemStr === 'note'){
                listid = IndexOf(item.lists, 'id', tid);
                notes.starnote(listid, tid);
            }else if(itemStr === 'mark'){
                //TODO:marks.star
                marks.unstar(this.list[listid]['id']);
            }
        }

        function delete_page_label(thatlabel) {
            thatlabel.parent().remove();
            
        }

        
    };
    

    function ItemsContainer() { //将会接受label,books,items传来的参数,并根据情况输出给note_list还是起错名字了-_-
        this.notes = notes; 
        this.mark = marks;
        this.reaction = 'notes_all_show'; //mark_note_show, book_note_show, star_note_show, trash_note_show
        this.lists = [];
        this.markid = ''; //星标记得也要有
        this.bookid = '';
        this.notes_info = '';
        this.isinit = 0;
        this.sortfor = 'updateAsc'; //updateAsc,updateDec,createAsc,createDec;

        this.getlist = function (reaction) {
            this.lists = [];
            if (reaction === 'notes_all_show') {
                for (var i = 0; i < this.notes.notes.length; ++i) {
                    if (this.notes.notes[i]['isdelete'] === '0') {
                        this.lists.push(this.notes.notes[i]);
                    }
                }
            } else if (reaction === 'mark_note_show') {
                this.notes_info = findInfoFromArray(marks.marks, this.markid, 'markName');

                for (i = 0; i < this.notes.notes.length; ++i) {
                    if (this.notes.notes[i]['isdelete'] === '0' && findmark(notes.notes[i]['markID'], this.markid)) {
                        this.lists.push(this.notes.notes[i]);
                    }
                }
            } else if (reaction === 'book_note_show') {

                for (i = 0; i < this.notes.notes.length; ++i) {
                    if (this.notes.notes[i]['isdelete'] === '0' && this.notes.notes[i]['notebookID'] === this.bookid) {
                        this.lists.push(this.notes.notes[i]);
                    }
                }
            } else if (reaction === 'trash_note_show') {
                for (i = 0; i < this.notes.notes.length; ++i) {
                    if (this.notes.notes[i]['isdelete'] === '0') {
                        this.lists.push(this.notes.notes[i]);
                    }
                }
            } else {
            }
        };
        this.setlist = function () {

            $('#items_num').html(this.lists.length + '条笔记');
        };
        this.listrefresh = function () {
            this.getlist(this.reaction);
            this.changesort(this.sortfor, 1); //等到服务器回应后才能删除成功
        };
        this.setTitle = function () {
            if (this.reaction === 'notes_all_show') {
                $('#items_title #title_content').html('笔记');
            } else if (this.reaction === 'mark_note_show') {
                $('#items_title #title_content').html('标签 ' + this.notes_info);
            } else if (this.reaction === 'book_note_show') {
                var bookname = findInfoFromArray(books.books, this.bookid, 'bookName');
                $('#items_title #title_content').html(bookname + ':');

            } else if (this.reaction === 'trash_noteAndLabel_show') {
                $('##items_title #title_content').html('废纸篓');
            } else if (this.reaction === 'star_note_show') {
                $('##items_title #title_content').html('标签 ' + this.notes_info);
            }
        };

        this.deleteitem = function (id, thatlabel) {
            notes.deletenote(this.lists[id]['id'], thatlabel, id);


        }; //仅仅在books和notes时

        this.listinit = function (reaction, need_id, autodisplay) {
            this.markid = need_id;
            this.bookid = need_id;
            this.reaction = reaction;
            this.getlist(reaction);
            this.changesort(this.sortfor, autodisplay);
        };
        this.star = function (strid) {
            notes.starnote(strid, this.lists[parseInt(strid)].id);
        }
        this.displaylist = function () { //bookid, markid这个只用管list notes
            $('#items_list').html('');
            if (this.isinit === 0) {//第一次displaylist
                this.isinit += 1;
                this.listinit('notes_all_show', 0);
            }
            var i = 0;
            // console.log('我寻思能跑');
            for (i = 0; i < this.lists.length; ++i) {
                var star = '';
                if (this.lists[i]['isStar'] === '1') {
                    star = 'glyphicon-star stared';
                } else if (this.lists[i]['isStar'] === '0') {
                    star = 'glyphicon-star-empty';
                }
                if (this.lists[i]['isdelete'] === '0') {
                    $('#items_list').html($('#items_list').html() +
                        '<div id="itemid_' + i + '"" class="item">' +
                        '<span id="item_title">' + this.lists[i]['title'] + '</span>' +
                        '<span class="glyphicon glyphicon-trash pull-right smallicon trash" style="color: rgb(255, 255, 255);"/>' +
                        '<span class="glyphicon pull-right smallicon star ' + star + '" style="color: rgb(255, 255, 255);"/>' +
                        '<br>' +
                        '<p id="item_excerpt">' + this.lists[i]['content'] +
                        '</div>' +
                        '<hr class="clear">');
                }
            }
            this.lightnotes();
            this.setTitle();
            this.setlist();

        };
        this.lightnotes = function () {
            $('#items_list .trash').click(function () { //删除笔记,标签,笔记本,星标
                var id = $(this).parent().attr('id');
                id = id.split('_');
                if (id[0] === 'itemid') {
                    item.deleteitem(id[1], $(this));
                } else if (id[0] === 'book') {
                    books.deletebook(id[1], $(this));
                }
                return false; //阻止事件冒泡,阻止事件默认行为
            });
            $('#items_list .star').click(function () {
                var id = $(this).parent().attr('id');
                id = id.split('_');
                if (id[0] === 'itemid') {
                    item.star(id[1]);
                }
                return false;
            });
            $('#items_list .star').hover(function () {
                $(this).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            }, function () {
                if (!($(this).hasClass('stared'))) {
                    $(this).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                }
            });
            $('#items_list .glyphicon-trash').hover(function () {
                $(this).removeClass('glyphicon-trash').addClass('glyphicon-remove');
            }, function () {
                $(this).removeClass('glyphicon-remove').addClass('glyphicon-trash');
            });
            $('.item').click(function () { //将笔记内容标题给编辑器TODO
                var str = $(this).children().eq(0).html();
                var str2 = $(this).children().eq(4).html();
                $('#edit_eara').html(str + '\n' + str2);
                $(lastclicktip).removeClass('clicked');
                $(this).addClass('clicked');
                lastclicktip = this;
            });
        };

        this.changesort = function (sortfor, autoDisplay) { //updateAsc,updateDec,createAsc,updateDec,nameAsc,nameDec;
            var list = this.lists;
            this.sortfor = sortfor;

            if (sortfor === 'createAsc') {
                list.sort(function (a, b) {
                    return Date.parse(a.createTime) - Date.parse(b.createTime);
                });

            } else if (sortfor === 'createDec') {
                list.sort(function (a, b) {
                    return -Date.parse(a.createTime) + Date.parse(b.createTime);
                });

            } else if (sortfor === 'updateAsc') {
                list.sort(function (a, b) {
                    return Date.parse(a.updateTime) - Date.parse(b.updateTime);
                });

            } else if (sortfor === 'updateDec') {
                list.sort(function (a, b) {
                    return -Date.parse(a.updateTime) + Date.parse(b.updateTime);
                });
            } else if (sortfor === 'nameAsc') {
                list.sort(function (a, b) {
                    return a.title > b.title;
                });

            } else if (sortfor === 'nameDec') {
                list.sort(function (a, b) {
                    return a.title < b.title;
                });

            }
            if (autoDisplay === 1)
                this.displaylist();
        }
    };

    //Main:
    var notes = new Notes();
    var books = new Books(notes);
    var item = new ItemsContainer();
    var marks = new Marks();
    var stars = new Stars();
    getAllnotes();
    books.getbooks();
    marks.getmarks();

    

    $('#star').click(function (){
        stars.fresh();
    })
    $('#notes').click(function () {
        item.listinit('notes_all_show', 0, 1);
    });
    $('.sortfor').click(function () {
        item.changesort($(this).attr('id'), 1);
    });
    $('#books').click(function () {
        books.printbooks();
    });
    //给item加上动画,只能加一次

});