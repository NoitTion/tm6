function IndexOf(arr, key, value) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i][key] === value) {
            return i;
        }
    }
}
function getMysqlquery(instance, autoUpdateTime = false){
    var o = JSON.parse(JSON.stringify(instance));
    if(autoUpdateTime)
        o.updateTime = getNowFormatDate();
    if(o.updateTime){
        o.updateTime = '\'' + o.updateTime + '\'';
    }
    if(o.createTime){
        o.createTime = '\'' + o.createTime + '\'';
    }//然后另外的都已经改过了在.php里,我并不是很清楚我为什么要写这个方法....为了增大维护难度么?
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
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
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
function typeofStars(aItem){
    var typearr = [];

    if(typeof aItem['title'] !== 'undefined'){
        typearr[0] = aItem['title'];
        typearr[1] = 'glyphicon-file';
        typearr[2] = 'note';
        typearr[3] = aItem['id'];

    }else if(typeof aItem['markName'] !== 'undefined'){
        typearr[0] = aItem['markName'];
        typearr[1] = 'glyphicon-bookmark';
        typearr[2] = 'mark';
        typearr[3] = aItem['id'];

    }else if(typeof aItem['bookName'] !== 'undefined'){
        typearr[0] = aItem['bookName'];
        typearr[1] = 'glyphicon-book';
        typearr[2] = 'book';
        typearr[3] = aItem['id'];

    }else{
        alert('unknown type aItem');
        return false;
    }
    return typearr;
}
function starHideItemIn(){
    $('#middle_star').fadeOut(0);
    $('#middle_notes').fadeIn(200);
}

function getstarlist(arr, des) {
    if(typeof arr === 'undefined')
        return false;
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i]['isStar'] === '1' && arr[i]['isdelete'] === '0') {
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
function updateTips(action, mes, func){
    $.post("ajax/setNBCL.php", {
        type: action,
        data: mes
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
        $('#edit_eara').html(str + '\n' + str2);
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