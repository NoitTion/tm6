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

// 检测密码是否一致，长度是否满足要求，是否填写完整
function fnSignUp(){
    var oPassword = document.getElementById("password").value;
    var oPassword1 = document.getElementById("password1").value;
    if (oPassword != oPassword1){
        document.getElementById("error_box").innerHTML = "两次密码输入不一致";
        return false;
    }
    if (oPassword  != 0 && oPassword.length < 6){
        document.getElementById("error_box").innerHTML = "密码长度不得小于6";
        return false;
    }
    if (document.getElementById("checkName_box").innerHTML != ""){
        return false;
    }
    if (fnCheckBlank()){
        return true;
    }
    return false;
}