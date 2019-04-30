// 定义编辑窗口引用
var editPane = null;

(function(){
    editPane = document.getElementById("editor").contentWindow;
    editPane.document.designMode = "on";
    editPane.document.contentEditable = true;
    editPane.document.open();
    editPane.document.write("<div id=editor_content></div>");
    editPane.document.close();
    editPane.focus();
})();

// 通用函数
function onEffect(effect){
    editPane.document.execCommand(effect, false);
}
// 修改字体
function family(f){
    var fm = f.value;
    editPane.document.execCommand("FontName", false, fm);
}
// 修改字体大小
function sized(f){
    console.log(f)
    var fm = f.value;
    editPane.document.execCommand("FontSize", false, fm);
}