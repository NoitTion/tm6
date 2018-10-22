<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>tinymce</title>
    <link rel="stylesheet" type="text/css" href="css/note_editor.css" />

    <script src='js/tinymce/tinymce.min.js'></script>
    <script>
        tinymce.init({
            selector: '#mytextarea',
            // menubar:false,
            language: 'zh_CN',
            // plugins: 'paste link image wordcount code autolink advlist contextmenu autoresize contextmenu auto',
            // autoresize_min_height: 580,
            // contextmenu: "paste link | cell row column deletetable",
            // toolbar: "insertfile undo redo | fontsizeselect styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
            // fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            branding: false,
            height: 580,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor textcolor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code help wordcount'
            ],
            toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css']
        });
    </script>
</head>

<body>
    
        <!-- 工具栏 -->
        <div id="editor_function_bar">
            <div id="small_function">
                <span class="glyphicon glyphicon-time"></span>
                <span class="glyphicon glyphicon-star-empty"></span>
                <span class="glyphicon glyphicon-info-sign"></span>
                <span class="glyphicon glyphicon-trash"></span>
                <div class='clear'></div>
            </div>

            <div id='small_function_right'>
                <span class="glyphicon glyphicon-fullscreen"> </span>
                <div class="complete">完成</div>
            </div>

            <div class='clear'></div>
    </div>
    <div id="editor_note_title">
        <input type="text" id="note_input" placeholder="请输入您的标题">
    </div>
        <div style="height:720px;overflow-x:hidden">
            
                <div id="mytextarea" style="height:660px;margin: 40px 40px;font-size:24px"></div>
            
        </div>
</body>

</html>