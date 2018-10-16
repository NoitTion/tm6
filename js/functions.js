function IndexOf(arr, key, value) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i][key] === value) {
            return i;
        }
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
function typeofStars(aItem){
    var typearr = [];

    if(typeof aItem['title'] !== 'undefined'){
        typearr[0] = aItem['title'];
        typearr[1] = 'glyphicon-file';
        typearr[2] = 'note';
    }else if(typeof aItem['markName'] !== 'undefined'){
        typearr[0] = aItem['markName'];
        typearr[1] = 'glyphicon-bookmark';
        typearr[2] = 'mark';

    }else if(typeof aItem['bookName'] !== 'undefined'){
        typearr[0] = aItem['bookName'];
        typearr[1] = 'glyphicon-book';
        typearr[2] = 'book';
    }else{
        alert('unknown type aItem');
        return false;
    }
    return typearr;

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