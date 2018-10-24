//for item(note), book, label, star
lastclicktip = '#itemid_0'; //上一次item被点击的id

$(window).resize(function () {
    $('.listScroll').css('height', $(window).height() - $('#items_list').offset().top) //给scroll设置高度
    $('#edit').css('width', $(window).width() - 325);

});

$(document).ready(function () {
    itemsarr = "";
    $('.listScroll').css('height', $(window).height() - $('#items_list').offset().top);
    $('#edit').css('width', $(window).width() - 325);

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
            //TODO server fix?
            trueid = IndexOf(this.notes, 'id', trueid);
            that = this;
            if (this.notes[trueid].isStar === '0') {
                this.notes[trueid].isStar = '1';
                var mnote = getMysqlquery(this.notes[trueid], true);
                // note['updateTime'] = '\'' + note['updateTime'] + '\'';
                updateTips('updatenote', mnote, function (data, status) {
                    if (status === 'success') {

                        $('#itemid_' + listid + ' .star').addClass('stared').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                    } else {
                        console.log('net error');
                        that.notes[trueid] = '0';
                    }
                    editor.refresh();
                });
            } else if (this.notes[trueid].isStar === '1') {
                this.notes[trueid].isStar = '0';
                var mnote = getMysqlquery(this.notes[trueid], true);
                updateTips('updatenote', mnote, function (data, status) {
                    if (status === 'success') {
                        $('#itemid_' + listid + ' .star').removeClass('stared').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                    } else {
                        console.log('net error');
                        that.notes[trueid] = '0';
                    }
                    editor.refresh();
                });
            } else {
                alert('starnote error');
            }
        };

        this.notDelnum = function () {
            var nums = 0;
            for (i = 0; i < this.notes.length; ++i) {
                if (this.notes[i]['isdelete'] === '0') {
                    nums++;
                }
            }
            return nums;
        };
        this.addAnote = function (newnote) { //新建笔记的时候用
            const that = this;
            var mysqlquery = getMysqlquery(newnote);
            updateTips('newnote', mysqlquery, function(data, status){
                //目前没有
                id = data;
                newnote.id = id;
                that.notes.push(newnote);
                console.log('addAnote');
                console.log(newnote);
                editor.setCurrentNote(newnote);
                item.getlist('notes_all_show');
                item.changesort(item.sortfor, 1);
            });
        };
        this.deletenote = function (id, thatLabel, r_id) { //从标签那里传过来
            const that = this; //后面的不给传递,要在这里缓存一下
            console.log(thatLabel);
            if (confirm('确认要删除?')) {
                //这里要向服务器端请求删除便签
                $.get("ajax/deleteData.php?id=" + id + '&action=note', function (status) {
                    if (status === '1') {
                        // console.log('note服务器请求删除成功');
                        if (typeof (thatLabel) != '-1')
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
                        editor.setCurrentNote(item.lists[0]);
                    } else {
                        alert('Error, check out your Internet. ERROR CODE:' + status);
                    }
                });
            }
        };
        this.updatenote = function(id){
            var note = this.notes[IndexOf(this.notes, 'id', id)];
            note.updateTime = getNowFormatDate();
            updateTips('updatenote', getMysqlquery(note), function(data, status){
                if(status === 'success'){
                    console.log(data);
                    item.getlist('notes_all_show');
                    item.changesort(item.sortfor, 1);
                }
            })
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
                stars.fresh(); //maybe there will be better method
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
                if (this.books[i].isStar === '1') {
                    isStard = 'glyphicon-star';
                } else {
                    isStard = 'glyphicon-star-empty';

                }
                if (this.books[i]['isdelete'] === '0') {
                    $('#books_list').html($('#books_list').html() +
                        '<div id="book_' + this.books[i]['id'] + '" class="book">' +
                        '<span id="book_title">' + this.books[i]['bookName'] + '</span>' +
                        '<span class="glyphicon glyphicon-trash pull-right smallicon trash" style="color: rgb(255, 255, 255);"/>' +
                        '<span class="glyphicon ' + isStard + ' pull-right smallicon star" style="color: rgb(255, 255, 255);"/>' +
                        '<br>' +
                        '<p id="book_num">' + that.booklength(that.books[i]['id']) + '个笔记' +
                        '</div>' +
                        '<hr class = "clear">');
                }
            }
            this.lightBooks();
        };

        this.starbook = function (bookid) {
            that = this;
            var index = IndexOf(this.books, 'id', bookid);
            if (this.books[index].isStar === '0') {
                this.books[index].isStar = '1';
                console.log(this.books[index]);
                updateTips('updatebook', this.books[index], function (data, status) {
                    if (status !== 'success') {
                        that.isStar = '0';
                        alert("error can't update book")
                    }
                })
            } else if (this.books[index].isStar === '1') {
                this.books[index].isStar = '0';
                updateTips('updatebook', this.books[index], function (data, status) {
                    if (status !== 'success') {
                        that.isStar = '1';
                        alert("error can't update book")
                    }
                })

            } else {
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
                } else {
                    alert('unknown action');
                }
                return false; //阻止事件冒泡,阻止事件默认行为
            });
            $('#books_list .star').click(function () {
                var id = $(this).parent().attr('id');
                id = id.split('_');
                if (id[0] === 'book') {
                    books.starbook(id[1]);
                } else {
                    alert('unknown action');
                }

                return false;
            });

            $('#books_list .star').hover(function () {
                $(this).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            }, function () {
                var id = $(this).parent().attr('id').split('_')[1];
                var booksIndex = IndexOf(books.books, 'id', id);
                if (books.books[booksIndex].isStar === '0')
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
        this.addAbook = function(){
            const that = this;
            var newbook = jQuery.extend(true, {}, this.books[0]);
            var bookname = $('#Create_input').val();
            var isoccupy = 0;
            for(var i = 0;i < this.books.length;++i){
                if(bookname === this.books[i].bookName){
                    isoccupy = 1;
                    break;
                }
            }
            if(isoccupy === 1){
                alert('笔记本名字重复,创建失败');
                return;
            }

            newbook['id'] = 'null';
            newbook['bookName']  = bookname;
            newbook['isdelete'] = '0';
            newbook['isShare'] = '0';
            newbook['isStar'] = '0';
            newbook['createTime'] = getNowFormatDate();
            newbook['updateTime'] = getNowFormatDate();
            newbook['sharedpeople'] = 'null';

            var mysqlquery = getMysqlquery(newbook);
            updateTips('newbook', mysqlquery, function(data, status){
                //目前没有
                id = data;
                newbook.id = id;
                that.books.push(newbook);
                console.log('addAbook');
                console.log(data);
                console.log(newbook);
                that.printbooks();
            });
        }
        this.deletebook = function (id, thatLabel) { //从标签那里传过来
            const that = this; //后面的不给传递,要在这里缓存一下
            if (confirm('确认要删除这个笔记本?')) {
                //这里要向服务器端请求删除便签
                $.get("ajax/deleteData.php?id=" + id + "&action=book", function (status) {
                    if (status === '1') {
                        thatlabel.remove(); //在网页上删除那个标签
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
        const that = this;
        this.getmarks = function () {
            const that = this;
            $.post("ajax/getNBCL.php", {
                action: 'mark'
            }, function (data, status) {
                that.marks = $.parseJSON(data);
                // that.printmarks();
                for (var i = 0; i < that.marks.length; ++i) {
                    that.addmethod(that.marks[i]);
                }
                that.marks.findmarkFrommarks = function (id) { //返回这个id的mark
                    for (var i = 0; i < this.length; ++i) {
                        if (this[i].id === id) {
                            return this[i];
                        }
                    }
                }
                that.printAllmark();
                stars.fresh(); //maybe there are more good method
                // that.marks[0].print_mark_to('#marks_list');
            })
        };
        this.addmethod = function(mark){
            mark.print_mark_to = Fprint_mark_to;
            mark.star = star;
            mark.lightme = lightme;
            mark.removemyself = removemyself;
            mark.alterName = alterName;
        }

        this.addAmark = function(){
            const that = this;
            var newmark = jQuery.extend(true, {}, this.marks[0]);
            var markname = $('#Create_input').val();
            var isoccupy = 0;
            for(var i = 0;i < this.marks.length;++i){
                console.log(markname);
                console.log(this.marks[i].markName);

                if(this.marks[i].isdelete === '0' && markname === this.marks[i].markName){
                    isoccupy = 1;
                    break;
                }
            }
            if(isoccupy === 1){
                alert('标签名字重复,创建失败');//TODO提示信息
                console.log(1);
                return;
            }

            newmark['id'] = 'null';
            newmark['markName']  = markname;
            newmark['isStar'] = '0';
            newmark['isdelete'] = '0';
            newmark['createTime'] = getNowFormatDate();
            newmark['updateTime'] = getNowFormatDate();
            newmark['notesnum'] = '0';

            var mysqlquery = getMysqlquery(newmark);
            updateTips('newmark', mysqlquery, function(data, status){
                //目前没有
                id = data;
                newmark.id = id;
                that.addmethod(newmark);
                that.marks.push(newmark);
                
                console.log('addAmark');
                console.log(data);
                console.log(newmark);
                that.printAllmark();
            });
        }
        function removemyself() {
            //REDO: send a request to server
            //interface: update(key, content);
            this.isdelete = '1';
            const that = this;
            var tb = getMysqlquery(that)
            updateTips('updatemark', tb, function(data, status) {
                if(status === 'success'){
                  $('#markid_' + that.id).parent().remove();
                  console.log(data);
                }else{
                    console.log('mark delete error');
                    that.isdelete = '0';
                }
            })
        }
        
        this.unstar = function (id) {
            var tid = IndexOf(this.marks, 'id', id);
            $('#markid_' + id + '+ #mark_operate .glyphicon-star').removeClass('mark_smallicon_selected').addClass('mark_smallicon');
            this.marks[tid].star('0');
        }

        // function update(content) {
        //     //TODO:server

        //     this.markName = content;

        // }
        this.calcnum = function(){

        }


        function star(ooe) { //one or zero '1' or '0'
        const that = this;
            if (ooe === '1') {
                //REDO:向服务器发送请求 if success:
                this.isStar = '1';
                var tb = getMysqlquery(that)
                updateTips('updatemark', tb, function(data, status) {
                    if(status === 'success'){
                        //pass
                    }else{
                        console.log('mark star error');
                        that.isStar = '0';
                    }
                })

            } else if (ooe === '0') {
                //REDO:向服务器发送请求 if success:
                this.isStar = '0';
                var tb = getMysqlquery(that)
                updateTips('updatemark', tb, function(data, status) {
                    if(status === 'success'){
                        //pass
                    }else{
                        console.log('mark star error');
                        that.isStar = '1';
                    }
                })

            } else {
                alert(this.id + 'star error');
            }
            //$('#marks_list #markid_' + this.id + ' glyphicon-star').css('color', 'green'); //in lightme()
        }

        function alterName(str) {
            //TODO: server
            const that = this;
            var tdmarkname = this.markName;//td都是副本的意思
            this.markName = str;
                var tb = getMysqlquery(that)
                updateTips('updatemark', tb, function(data, status) {
                    if(status === 'success'){
                        $('#markid_' + that.id + '  .mark_name').html(str);
                    }else{
                        console.log('mark alter error');
                        that.markName = tdmarkname;

                    }
                })
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
                if(str == null){
                    return;
                }
                for(var i = 0;i < marks.marks.length;++i){//confirm 名字重复.
                    if(marks.marks[i].markName === str){
                        alert('命名失败,标签名重复');
                        return;
                    }
                }
                if (str != null && str.trim() !== '') {
                    that.alterName(str);
                }else{
                    alert('请输入有意义的名字');
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
            if (this.isStar === '1') {
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
                '        <span class="glyphicon glyphicon-star mark_smallicon pull-left ' + isSelected + '"></span>' +
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
                return Date.parse(a.updateTime) - Date.parse(b.updateTime);
            })
        };
        this.display = function () {
            $('#stars_list').html('');

            for (var i = 0; i < this.list.length; ++i) {
                var iconType = typeofStars(this.list[i]);
                $('#stars_list').html($('#stars_list').html() +
                    '<div id="starid_' + i + '" class="star_single canoselected">' +
                    '<span class="glyphicon ' + iconType[1] + ' pull-left">&nbsp</span>' +
                    '<div id="star_name" class="pull-left">' + iconType[0] + '</div>' +
                    '<span class="glyphicon glyphicon-remove-circle pull-right"></span>' +
                    '<div class="clear"></div>' +
                    '</div>'
                );
            }
        }

        this.fresh = function () {
            this.getstars();
            this.sort();
            this.display();
            this.lightStar();
        }
        this.lightStar = function () {
            const that = this;
            for (var i = 0; i < this.list.length; ++i) {
                $('#starid_' + i + ' .glyphicon-remove-circle').click(i, function (event) {
                    var i = event.data;
                    console.log('#starid_' + i + ' .glyphicon-remove-circle');
                    console.log(i);

                    that.deletestar(i);
                    $(this).parent().remove();
                });
            }
            $('.star_single').click(function () {
                var str = $(this).attr('id').split('_')[1];
                var type = typeofStars(that.list[str]);
                console.log(type);
                if (type[2] === 'book') {
                    item.listinit('book_note_show', type[3], 1);
                    starHideItemIn();
                } else if (type[2] === 'mark') {
                    item.listinit('mark_note_show', type[3], 1);
                    starHideItemIn();

                } else if (type[2] === 'note') {
                    //TODO: notes.notes[i].display(1);//fullscreen:1 or 0
                    editor.setCurrentNote(that.list[str]);
                    starHideItemIn();

                }
            })
        }
        this.deletestar = function (listid) {

            var itemStr = typeofStars(this.list[listid])[2];
            console.log('type of star is ' + itemStr);
            var tid = this.list[listid]['id'];
            if (itemStr === 'book') {
                books.starbook(tid);
            } else if (itemStr === 'note') {
                listid = IndexOf(item.lists, 'id', tid);

                notes.starnote(listid, tid);
            } else if (itemStr === 'mark') {
                //TODO:marks.star
                marks.unstar(this.list[listid]['id']);
            }
        }

        function delete_page_label(thatlabel) {
            thatlabel.parent().remove();

        }


    };


    function ItemsContainer() { 
        this.reaction = 'notes_all_show'; //mark_note_show, book_note_show, star_note_show, trash_note_show
        this.notes = notes;
        this.mark = marks;
        this.lists = [];
        this.markid = ''; //星标记得也要有
        this.bookid = '';
        this.notes_info = '';
        this.isinit = 0;
        this.sortfor = 'createDec'; //updateAsc,updateDec,createAsc,createDec;

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
            } else {}
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
                $('#items_title #title_content').html('废纸篓');
            } else if (this.reaction === 'star_note_show') {
                $('#items_title #title_content').html('标签 ' + this.notes_info);
            }
        };

        this.deleteitem = function (id, thatlabel) {
            console.log(id);
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
            if (this.isinit === 0) { //第一次displaylist
                this.isinit += 1;
                this.listinit('notes_all_show', 0);
            }else{
                this.isinit += 1;
            }
            var i = 0;
            for (i = 0; i < this.lists.length; ++i) {
                var star = '';
                if (this.lists[i]['isStar'] === '1') {
                    star = 'glyphicon-star stared';
                } else if (this.lists[i]['isStar'] === '0') {
                    star = 'glyphicon-star-empty';
                }
                var subdate = '';
                if(this.sortfor === 'updateAsc' || this.sortfor === 'updateDec' || this.sortfor === 'nameAsc' || this.sortfor === 'nameDec'){
                    subdate = subDate(this.lists[i]['updateTime']);
                }else if(this.sortfor === 'createAsc' || this.sortfor === 'createDec' || this.sortfor === 'nameAsc' || this.sortfor === 'nameDec'){
                    subdate = subDate(this.lists[i]['createTime']);
                }
                if (this.lists[i]['isdelete'] === '0') {
                    $('#items_list').html($('#items_list').html() +
                        '<div id="itemid_' + i + '"" class="item">' +
                        '<span id="item_title">' + this.lists[i]['title'] + '</span>' +
                        '<span class="glyphicon glyphicon-trash pull-right smallicon trash" style="color: rgb(255, 255, 255);"/>' +
                        '<span class="glyphicon pull-right smallicon star ' + star + '" style="color: rgb(255, 255, 255);"/>' +
                        '<br>' +
                        '<p id="item_excerpt">' + subdate +
                        '<br>' +
                        '<p id="item_excerpt">' + deformat(this.lists[i]['content'])  +
                        '</div>' +
                        '<hr class="clear">');
                }
            }
            this.lightnotes();
            this.setTitle();
            this.setlist();
            if(this.isinit === 1){//home刚打开显示第一条笔记
                // editor.setCurrentNote(this.lists[0]);还要等到editor加载完

            }
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
                var str = $(this).attr('id').split('_')[1];

                editor.setCurrentNote(notes.notes[IndexOf(notes.notes, 'id', item.lists[str]['id'])]);
                $(lastclicktip).removeClass('clicked');
                $(this).addClass('clicked');
                lastclicktip = this;
            });
        };

        this.addEmptyitem = function(){
            var newnote = jQuery.extend(true, {}, notes.notes[0]);

            newnote['id'] = 'null';
            newnote['title']  = '无标题';
            newnote['content'] = '<p><br data-mce-bogus="1"></p>';
            newnote['markID'] = '';
            newnote['notebookID'] = '1';
            newnote['remindTime'] = 'null';
            newnote['createTime'] = getNowFormatDate();
            newnote['updateTime'] = getNowFormatDate();
            newnote['remindTime'] = 'null';
            newnote['isShare'] = '0';
            newnote['isdelete'] = '0';
            newnote['sharedpeople'] = 'null';

            notes.addAnote(newnote);
            // this.lists.push(newServernote);
            // this.getlist('notes_all_show');
            // this.changesort(this.sortfor, 1);
        }
        this.changesort = function (sortfor, autoDisplay) { //updateAsc,updateDec,createAsc,updateDec,nameAsc,nameDec;
            const list = this.lists;
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
            for(var i = 0;i < list.length; ++i){
                list[i].listindex = i;
            }

            if (autoDisplay === 1)
                this.displaylist();
        }
    };
    function Editor(){
        this.setCurrentNote = function(note){
            this.currentNote = note;
            var editorArea = tinymce.get('mytextarea');
            $('#note_input').val(this.currentNote.title);
            editorArea.setContent(this.currentNote.content);
            this.refresh();
        }
        this.refresh = function(){
            if(this.currentNote.isStar === '1'){
                $('#small_function .glyphicon-star-empty').css('color', '#2dbe60');
            }else if(this.currentNote.isStar === '0'){
                $('#small_function .glyphicon-star-empty').css('color', '#a5a4a3');

            }
        }
        this.complete = function(){
            var editorArea = tinymce.get('mytextarea');
            console.log(this.currentNote);  

            this.currentNote.title = $('#note_input').val();
            this.currentNote.content = editorArea.getContent();
            notes.updatenote(this.currentNote.id);
        }
        this.star = function(){
            notes.starnote(IndexOf(item.lists, 'id', this.currentNote.id), this.currentNote.id);
        }
        this.trash = function(){
            // item.deleteitem(IndexOf(item.lists, 'id', this.currentNote.id), $('#itemid_' + IndexOf(item.lists, 'id', this.currentNote.id) + " .glyphicon-trash"));//有时间还是要改一下...这是什么鬼代码

            item.deleteitem(this.currentNote.listindex, $('#itemid_' + this.currentNote.listindex + " .glyphicon-trash"));
            
        }
    }

    //Main:
    var notes = new Notes();
    var books = new Books(notes);
    var item = new ItemsContainer();
    var marks = new Marks();
    var stars = new Stars();
    var editor = new Editor(); 
    getAllnotes();
    books.getbooks();
    marks.getmarks();








    function createMarkOrBook(str){
        if(str === 'book'){
            $('#CreateBox_center .glyphicon').removeClass('glyphicon-bookmark').addClass('glyphicon-book');
            $('#Create_name').html('创建笔记本');
            $('#Create_input').attr('placeholder', '给笔记本起个名字');
            $('#Create_input').val("");        
            $('#mask').fadeIn();
            $('#CreateComplete').click(function(){
                if($(this).hasClass('input_ok')){
                    $('#mask').fadeOut();
                    books.addAbook();
                }
            })
        }else if(str === 'mark'){
            $('#CreateBox_center .glyphicon').removeClass('glyphicon-book').addClass('glyphicon-bookmark');
            $('#Create_name').html('创建标签');
            $('#Create_input').attr('placeholder', '给标签起个名字');
            $('#Create_input').val("");        
            $('#mask').fadeIn();
            $('#CreateComplete').click(function(){
                if($(this).hasClass('input_ok')){
                    $('#mask').fadeOut();
                    marks.addAmark();
                    return false;
                }
            })
        }
    }
    //给mask book new添加事件
    $('#add_mark').click(function(){
        createMarkOrBook('mark');
    })
    $('#add_book').click(function(){
        createMarkOrBook('book');
    })
    $('#Create_cancel').click(function(){
        $('#mask').fadeOut();
    });
    $('#Create_input').on('input', function(e){
        e = e.delegateTarget.value;
        if(e === ''){
            $('#CreateComplete').removeClass("input_ok").addClass("Create_complete");
        }else{
            $('#CreateComplete').removeClass("Create_complete").addClass("input_ok");
        }
    });
    $('#small_function .glyphicon-trash').click(function(){
        editor.trash();
    })
    $('#small_function .glyphicon-star-empty').click(function(){
        editor.star();
    })
    $('.complete').click(function(){
        console.log('click');
        editor.complete();
    })
    $('#new').click(function() {
        item.addEmptyitem();
    })
    $('#star').click(function () {
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