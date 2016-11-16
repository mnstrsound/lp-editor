<?php

    require_once ('./functions.php');

    function saveStateController($data) {
        publishHtml($data);
        return [
            'status' => 'success',
            'data' => 'data'
        ];
    }

    function createTemplatePageController($templatePath) {
        publishHtml(json_decode(
                file_get_contents(JSON_PATH . $templatePath), TRUE)
        );
        copy(JSON_PATH . $templatePath, BACKUPS_PATH . microtime());
        return [
            'status' => 'success',
            'data' => getTemplateContent($templatePath)
        ];
    }

    function getAllBackupsController() {
        return [
            'status' => 'success',
            'data' => getBackups()
        ];
    }

    function getLatestBackupController() {
        $backups = getBackups();
        $count = count($backups);
        return [
            'status' => 'success',
            'data' => $count > 1 ? $backups[0] : ''
        ];
    }

    function getTemplatesController() {
        return [
            'status' => 'success',
            'data' => getTemplates()
        ];
    }

    function getStatusController() {
        $backups = getBackups();
        $bool = (bool)count($backups);
        return [
            'status' => 'success',
            'data' => [
                'activated' =>  $bool,
                'items' =>  $bool ? getBackups() : getTemplates()
            ]
        ];
    }

    function getMediaController() {
        return [
            'status' => 'success',
            'data' => getMedia()
        ];
    }

    function uploadMediaController() {
        return [
            'status' => 'success',
            'data' => getMedia()
        ];
    }

    $data = [];
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $data = $_GET;
    } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (count($_FILES) > 0) {
            $uploaddir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
            $uploadfile = $uploaddir . basename($_FILES['file']['name']);

            if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
                echo json_encode([
                    'status' => 'success',
                    'data' => getMedia()
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'data' => getMedia()
                ]);
            }
            die;
        } else {
            $data = json_decode(file_get_contents('php://input'), true);
        }
    }
    $response = [];
    switch($data['method']) {
        case 'get.status': {
            $response = getStatusController();
            break;
        }
        case 'create.template.page': {
            $response = createTemplatePageController($data['templatePath']);
            break;
        }
        case 'save.state': {
            $response = saveStateController($data['data']);
            break;
        }
        case 'get.all.backups': {
            $response = getAllBackupsController();
            break;
        }
        case 'get.latest.backup': {
            $response = getLatestBackupController();
            break;
        }
        case 'get.media': {
            $response = getMediaController();
            break;
        }
        case 'upload.media': {
            $response = uploadMediaController();
            break;
        }
        default: {
            $response = [
                'status' => 'error',
                'data' => 'data',
            ];
        }
    }
    echo json_encode($response);
