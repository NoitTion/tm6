var xmlhttp;
function loadXMLDoc(url, cfunc){
    // 创建XMLHTTPRequest对象
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = cfunc;
    // 向服务器发送请求
    // 规定请求类型
    xmlhttp.open("GET", url, true);
    // 将请求发送到服务器
    xmlhttp.send();
}

// 检查用户名是否被使用
function checkSameName(){
    // 4：请求已完成，且响应已就绪
    // 200：OK
    var username = document.getElementById("username").value;
    if (username.length == 0){
        return;
    }
    loadXMLDoc("checkSameName.php?username="+username, function (){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            // 获得字符串形式的响应数据
            document.getElementById("checkName_box").innerHTML = xmlhttp.responseText;
        }
    });
}

