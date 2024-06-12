<?php
require_once "../models/Database.php";
require_once "../models/User.php";

session_start();

function updateGameJsonn()
{
    $db = new Database();
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $tmpFilePath = $_FILES['fileUpload']['tmp_name'];

        if ($tmpFilePath === '') {
            $outcome = $db->getGameById($_POST["id"]);
            $fileContent = $outcome['game']->getContent();
        } else {
            $fileContent = file_get_contents($tmpFilePath);
        }

        $result = $db->updateGameJson(
            $_POST["id"],
            $_POST["name"],
            $fileContent,
            $_POST["status"],
            $_POST["category"]
        );

        if ($result["success"]) {
            $_SESSION["uploadResult"] = "File updated successfully";
            header("Location: ../pages/gamesJson.php");

        } else {
            $_SESSION["error"] = $result["error"];
            $_SESSION["uploadResult"] = 'File update failed.';

            header("Location: ../pages/gamesJson.php");

        }

        exit();
    } else {
        $_SESSION["uploadResult"] = 'Error occurred processing the update.';
        header("Location: ../pages/editGame.php");
        exit();
    }
}

updateGameJsonn();
