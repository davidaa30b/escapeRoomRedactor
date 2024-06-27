<?php
require_once "../models/Database.php";
require_once "../models/User.php";

session_start();

function addGameJson()
{
    $db = new Database();
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $tmpFilePath = $_FILES['fileUpload']['tmp_name'];

        if ($tmpFilePath == "") {
            $fileContent = "";
        } else {
            $fileContent = file_get_contents($tmpFilePath);

        }


        $gameNew = json_decode($fileContent, true);
        $result = $db->addGameJson(
            $gameNew['game']['name'],
            $fileContent,
            $gameNew['game']['status'],
            $gameNew['game']['category']
        );

        $formData = [
            "name" => $gameNew['game']['name'],
            "status" => $gameNew['game']['status'],
            "category" => $gameNew['game']['category']
        ];

        $_SESSION["errors"] = $result["errors"];
        $_SESSION["formData"] = $formData;

        if ($result["success"]) {
            $_SESSION["uploadResult"] = "Game was uploaded successfully";
            header("Location: ../pages/gamesJson.php");
            exit();
        } else {

            $_SESSION["errorResult"] = 'Game upload failed.';
            header("Location: ../pages/importGameJson.php");
            exit();
        }

    }
}

addGameJson();
