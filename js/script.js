// 检测输入是否空白
function fnCheckBlank(){
    var list = document.getElementsByTagName("input")
    for(var i = 0; i < list.length; i++){
        if(list[i].value == "" || list[i].value == null){
            document.getElementById("error_box").innerHTML = "请填写完整";
            return false;
        }
    }
    return true;
}

function fnClearError(){
    document.getElementById("error_box").innerHTML = "";
}