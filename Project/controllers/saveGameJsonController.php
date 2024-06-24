<?php
require_once "../models/Database.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $content = $_POST['content'];
    $status = $_POST['status'];
    $category = $_POST['category'];

    $db = new Database();
    $result = $db->addGameJson($name, $content, $status, $category);

    echo json_encode($result);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid request method.'
    ]);
}
