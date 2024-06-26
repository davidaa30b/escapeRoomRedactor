<?php
require_once "../models/Database.php";
require_once "../models/User.php";

session_start();

function updateGameJsonn()
{
    $db = new Database();
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {


        $result = $db->updateGameJson(
            $_POST["id"],
            $_POST["name"],
            $_POST["content"],
            $_POST["status"],
            $_POST["category"]
        );

        echo json_encode($result);

    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid request method.'
        ]);
    }
}

updateGameJsonn();
