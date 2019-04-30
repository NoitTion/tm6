function IndexOf(arr, key, value) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i][key] === value) {
            return i;
        }
    }
}

function ismousin(divmark, e) {
    x = e.pageX;
    y = e.pageY;
    var div = $(divmark); //获取你想要的DIV
    var y1 = div.offset().top; //div上面两个的点的y值
    var y2 = y1 + div.height(); //div下面两个点的y值
    var x1 = div.offset().left; //div左边两个的点的x值
    var x2 = x1 + div.width(); //div右边两个点的x的值

    if (x < x1 || x > x2 || y < y1 || y > y2) {
            return false;
        } else {
            return true;
        }
    }

    function deformat(str) {
        return str.replace(/<\/?.+?>/g, "").replace(/ /g, "");

    }

    function getMysqlquery(instance, autoUpdateTime = false) {
        var o = JSON.parse(JSON.stringify(instance));
        if (autoUpdateTime)
            o.updateTime = getNowFormatDate();
        if (o.updateTime) {
            o.updateTime = o.updateTime;
        }
        if (o.createTime) {
            o.createTime = o.createTime;
        } //然后另外的都已经改过了在.php里,我并不是很清楚我为什么要写这个方法....为了增大维护难度么?
        return o;
    }

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds();
        return currentdate;
    }

    function subDate(faultDate, currenttime = (new Date()).getTime()) {
        var stime = Date.parse(new Date(faultDate));
        // var etime = Date.parse(new Date(completeTime));
        etime = currenttime;
        var usedTime = etime - stime; //两个时间戳相差的毫秒数
        var days = Math.floor(usedTime / (24 * 3600 * 1000));
        var months = Math.floor(days / 30);
        days = days - months * 30;
        var years = Math.floor(months / 12);
        months = months - 12 * years;
        //计算出小时数
        var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        var leave3 = leave2 % (60 * 1000);
        var seconds = Math.floor(leave3 / 1000);
        if (years >= 1 && months >= 1) {
            return years + '年' + months + "月前";
        } else if (years >= 1) {
            return years + '年前';
        } else if (months >= 1 && days >= 1) {
            return months + '个月' + days + '天前';
        } else if (months >= 1) {
            return months + '个月前';
        } else if (days >= 1) {
            return days + '天前';
        } else if (hours >= 1) {
            return hours + '小时' + minutes + '分钟前';
        } else if (minutes >= 1) {
            return minutes + '分钟' + seconds + '秒前';
        } else if (seconds >= 0) {
            return seconds + '秒前';
        } else {
            return '逻辑出错了';
        }
    }

    function findmark(notemark, markid) {
        if (notemark !== null) {
            marks = notemark.split('_');
            console.log(marks);
            for (var i = 0; i < marks.length; ++i) {
                if (marks[i] === markid) {
                    return true;
                }
            }
        }
        return false;

    }

    function typeofStars(aItem) {
        var typearr = [];

        if (typeof aItem['title'] !== 'undefined') {
            typearr[0] = aItem['title'];
            typearr[1] = 'glyphicon-file';
            typearr[2] = 'note';
            typearr[3] = aItem['id'];

        } else if (typeof aItem['markName'] !== 'undefined') {
            typearr[0] = aItem['markName'];
            typearr[1] = 'glyphicon-bookmark';
            typearr[2] = 'mark';
            typearr[3] = aItem['id'];

        } else if (typeof aItem['bookName'] !== 'undefined') {
            typearr[0] = aItem['bookName'];
            typearr[1] = 'glyphicon-book';
            typearr[2] = 'book';
            typearr[3] = aItem['id'];

        } else {
            alert('unknown type aItem');
            return false;
        }
        return typearr;
    }

    function starHideItemIn() {
        $('#middle_star').fadeOut(0);
        $('#middle_notes').fadeIn(200);
    }

    function getstarlist(arr, des) {
        if (typeof arr === 'undefined')
            return false;
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i]['isStar'] === '1' && arr[i]['isdelete'] === '0') {
                des.push(arr[i]);
            }
        }
    }
    function gettrashlist(arr, des) {
        if (typeof arr === 'undefined')
            return false;
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i]['isdelete'] === '1') {
                des.push(arr[i]);
            }
        }
    }

    function findInfoFromArray(arr, id, want) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i]['id'] === id) {
                return arr[i][want];
            }
        }
    }
    /*
    action:newnote, updatenote, newbook, updatebook, newmark, updatemark
    mes:book, note, mark
    func:callbackfunc
    */
    function updateTips(action, mes, func) {
        $.post("ajax/setNBCL.php", {
            type: action,
            data: mes
        }, function (data, status) {
            func(data, status);
        })
    }
    /**
     * 
     * @param {note, notebook, mark} action 
     * @param {num} id 
     * @param {func} func 
     */
    function realdeleteNBLS(action, id, func){
        $.post("ajax/realdeleteNBCL.php", {
            type: action,
            data: id
        }, function (data, status) {
            func(data, status);
        })
    }
    

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
        $('.item').click(function () { //将笔记内容标题给编辑器
            var str = $(this).children().eq(0).html();
            var str2 = $(this).children().eq(4).html();
            $('#editor_content').html(str + '\n' + str2);
            $(lastclicktip).removeClass('clicked');
            $(this).addClass('clicked');
            lastclicktip = this;
        });
        $('.trash').click(function () { //删除笔记,标签,笔记本,星标
            var id = $(this).parent().attr('id');
            id = id.split('_');
            if (id[0] === 'itemid') {
                item.deleteitem(id[1], $(this));
            } else if (id[0] === 'book') {
                books.deletebook(id[1], $(this));
            }
            return false; //阻止事件冒泡,阻止事件默认行为
        });
        $('.star').click(function () {
            alert(211);
            return false;
        });
        $('.book').click(function () {
            var str = $(this).attr('id').split('_')[1];
            // console.log('这个笔记本的id为' + str);
            item.listinit('book_note_show', str, 1) //通过id要知道真正的id
            $('#middle_books').fadeOut(0);
            $('#middle_notes').fadeIn(200);
        });
        $('#notes').click(function () {
            item.listinit('notes_all_show', 1);
        });
        $('.sortfor').click(function () {
            item.changesort($(this).attr('id'), 1);
        })
    }