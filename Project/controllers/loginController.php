<?php
require_once "../models/Database.php";
require_once "../models/User.php";

session_start();

function login()
{
    $db = new Database();
    $result = $db->loginUser($_POST["email"], $_POST["password"]);

    $formData = [
        "email" => $_POST["email"],
    ];


    if ($result["success"]) {
        $dbUser = $result["user"];
        $user = new User($dbUser["firstName"], $dbUser["lastName"], $dbUser["email"]);

        $_SESSION["user"] = $user;


        header("Location: ../pages/home.php");
        exit();
    } else {

        $_SESSION["formData"] = $formData;
        $_SESSION["errors"] = $result["errors"];
        header("Location: ../pages/login.php");
        exit();

    }
}

login();
