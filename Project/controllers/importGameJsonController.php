<?php
require_once "../models/Database.php";
require_once "../models/User.php";

session_start();

function addGameJson()
{
    $db = new Database();
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['fileUpload'])) {
        $tmpFilePath = $_FILES['fileUpload']['tmp_name'];

        $fileContent = file_get_contents($tmpFilePath);
        //$fileContent = '<pre>' . htmlspecialchars($fileContent) . '</pre>';


        $result = $db->addGameJson(
            $_POST["name"],
            $fileContent,
            $_POST["status"],
            $_POST["category"]
        );

        if ($result["success"]) {
            $_SESSION["uploadResult"] = "File uploaded successfully";
            header("Location: ../pages/importGameJson.php");

        } else {
            $_SESSION["error"] = $result["error"];
            $_SESSION["uploadResult"] = 'File upload failed.';

            header("Location: ../pages/importGameJson.php");

        }

        exit();
    } else {
        $_SESSION["uploadResult"] = 'No file uploaded.';
        header("Location: ../pages/addGameJson.php");
        exit();
    }
}

addGameJson();
