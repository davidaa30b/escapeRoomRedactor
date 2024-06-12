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
            $fileConten = "";
        } else {
            $fileContent = file_get_contents($tmpFilePath);

        }

        $formData = [
            "name" => $_POST["name"],
            "status" => $_POST["status"],
            "category" => $_POST["category"]
        ];

        $result = $db->addGameJson(
            $_POST["name"],
            $fileContent,
            $_POST["status"],
            $_POST["category"]
        );

        $_SESSION["errors"] = $result["errors"];
        $_SESSION["formData"] = $formData;

        if ($result["success"]) {
            $_SESSION["uploadResult"] = "Game was uploaded successfully";
            header("Location: ../pages/gamesJson.php");
            exit();
        } else {

            $_SESSION["uploadResult"] = 'Game upload failed.';
            header("Location: ../pages/importGameJson.php");
            exit();
        }

    }
}

addGameJson();
