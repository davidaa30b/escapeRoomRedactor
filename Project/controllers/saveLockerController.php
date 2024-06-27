<?php
require_once "../models/Database.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $regex = $_POST['regex'];
    $answer = $_POST['answer'];
    $urlsNum = $_POST['urlsNum'];
    $logo = $_POST['logo'];
    $usrls = $_POST['usrls'];
    $type = $_POST['type'];
    $attemptsNumber = $_POST['attemptsNumber'];
    $showAttempts = $_POST['showAttempts'];
    $points = $_POST['points'];
    $forceOrder = $_POST['forceOrder'];
    $resourcesNum = $_POST['resourcesNum'];
    $resources = $_POST['resources'];


    $db = new Database();
    $result = $db->addLocker($regex, $answer, $urlsNum, $logo, $usrls, $type, $attemptsNumber, $showAttempts, $points, $forceOrder, $resourcesNum, $resources);

    echo json_encode($result);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid request method.'
    ]);
}
