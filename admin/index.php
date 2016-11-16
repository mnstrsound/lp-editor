<?php 
    require_once ('./api/functions.php');

    $backups = getBackups();
    $haveBackups = (bool)count($backups);
    $currentState = json_decode(file_get_contents('./backups/' . $backups[0]), TRUE);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <script src="./src/tinymce/tinymce.min.js"></script>
    <link rel="stylesheet" href="../node_modules/react-image-crop/dist/ReactCrop.css">
    <script>
        var state = {
            Markup: {
                editor: {
                    state: null,
                    currentNodePath: null,
                    loading: false,
                    snackbar: {
                        show: false,
                        text: ''
                    }
                },
                nodes: <?= json_encode($currentState['Nodes']); ?>
            },
            PageSettings: {
                editor: {
                    state: null
                },
                settings: <?= json_encode($currentState['PageSettings']); ?>
            },
            Activated: <?= $haveBackups ?>,
            Backups: <?= json_encode($backups, TRUE); ?>
        };
        var head = document.getElementsByTagName('head')[0];
        state.PageSettings.settings.links.forEach(function (item, index) {
            var style = document.createElement('link');

            style.rel = item.rel;
            style.href = item.href;

            head.appendChild(style);
        });
    </script>
    <style>
        * {
            box-sizing: border-box;
        }

        .section-editor {
            z-index: 5;
            padding: 10px;
            color: #fff;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0,0,0,.3);
        }

        input,
        textarea,
        button {
            border: 0;
            outline: none;
        }

        

    </style>
</head>
<body>
    <div id="root"></div>
    <script src="build/bundle.js"></script>
</body>
</html>