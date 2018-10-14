function fnSignUp(){
    var oPassword = document.getElementById("password").value;
    var oPassword1 = document.getElementById("password1").value;
    if (oPassword != oPassword1){
        document.getElementById("error_box").innerHTML = "两次密码输入不一致"
    }
}