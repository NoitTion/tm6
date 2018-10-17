<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Cloud Note</title>
    <link rel="stylesheet" type="text/css" href="css/note_editor.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css">
</head>

<body>
    <div id="main">
        <!-- 工具栏 -->
        <div id="toolbar">
            <ul>
                <li>
                    <a href="javascript:void(0)" onclick="onEffect('Bold')" title="加粗">
                        <i class="fa fa-bold"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('italic')" title="斜体">
                        <i class="fa fa-italic"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('underline')" title="下划线">
                        <i class="fa fa-underline"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('copy')" title="复制">
                        <i class="fa fa-files-o"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('undo')" title="撤销">
                        <i class="fa fa-undo"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('removeFormat')" title="清除格式">
                        <i class="fa fa-eraser"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('justifyLeft')" title="左对齐">
                        <i class="fa fa-align-left"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('justifyCenter')" title="居中对齐">
                        <i class="fa fa-align-center"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="onEffect('justifyRight')" title="右对齐">
                        <i class="fa fa-align-right"></i>
                    </a>
                    <!-- <a href="javascript:void(0)" onclick="pic()" title="插入图片" id="pic">
                        <i class="fa fa-file-photo-o"></i>
                    </a> -->
                    <select name="size" onclick="family(this)">
                        <option value="微软雅黑" style="font-family: '微软雅黑'" selected>微软雅黑</option>
                        <option value="宋体" style="font-family: '宋体'">宋体</option>
                        <option value="幼圆" style="font-family: '幼圆'">幼圆</option>
                        <option value="楷体" style="font-family: '楷体'">楷体</option>
                        <option value="等线" style="font-family: '等线'">等线</option>
                        <option value="方正舒体" style="font-family: '方正舒体'">方正舒体</option>
                        <option value="黑体" style="font-family: '黑体'">黑体</option>
                        <option value="华文彩云" style="font-family: '华文彩云'">华文彩云</option>
                    </select>
                    <select name="size" onclick="sized(this)">
                        <option value="1">8</option>
                        <option value="2">10</option>
                        <option value="3">12</option>
                        <option value="4" selected>16</option>
                        <option value="5">18</option>
                        <option value="6">25</option>
                        <option value="7">36</option>
                    </select>

                </li>
            </ul>
        </div>
        <!-- 编辑区 -->
        <iframe src="" frameborder="0" allowTransparency='true' id="editor">
        </iframe>
        <form id="forms" action="" method="post" enctype="multipart/form-data">
            <input id="inputobj" type="file" name="myFile" style=" display:none;" />
        </form>

    </div>
</body>
<script type="text/javascript" src="js/note_editor.js"></script>

</html>