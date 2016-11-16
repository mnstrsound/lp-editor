<?php
define('JSON_PATH', './../public/json/');
define('BACKUPS_PATH', './backups/');
define('INDEX_PATH', './../../index.html');
define('MEDIA_PATH', './../../public/media/');
define('UPLOAD_PATH', './../../uploads/');

include_once ($_SERVER['DOCUMENT_ROOT'] . '/admin/api/Classes/PageCreator.php');

function getBackups() {
    return array_slice(scandir(BACKUPS_PATH), 2);
}

function getTemplates() {
    $data = [];
    $items = array_slice(scandir(JSON_PATH), 2);
    if (count($items) > 0) {
        foreach ($items as $item) {
            array_push($data, file_get_contents(JSON_PATH . "${item}"));
        }
    }
    return $items;
}

function getTemplateContent($templatePath) {
    return file_get_contents(JSON_PATH . $templatePath);
}

function publishHtml($data) {
    $markup = PageCreator::makeMarkup($data);
    return file_put_contents(INDEX_PATH, $markup);
}

function saveBackup($data) {
    return file_put_contents(BACKUPS_PATH . microtime() . '.json', $data);
}

function getMedia() {
    $uploadFiles = array_map(function($item) {
        return '/uploads/' . $item;
    }, array_slice(scandir(UPLOAD_PATH), 2));
    $mediaFiles = array_map(function($item) {
        return '/public/media/' . $item;
    }, array_slice(scandir(MEDIA_PATH), 2));
    return array_merge($uploadFiles, $mediaFiles);
}