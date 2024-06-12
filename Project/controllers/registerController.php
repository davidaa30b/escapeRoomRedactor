<?php
require_once "../models/Database.php";

session_start();

function register()
{
    $db = new Database();

    $formData = [
        "email" => $_POST["email"],
        "password" => $_POST["password"],
        "firstName" => $_POST["firstName"],
        "lastName" => $_POST["lastName"]
    ];

    $result = $db->registerUser(
        $_POST["email"],
        $_POST["password"],
        $_POST["firstName"],
        $_POST["lastName"]
    );


    $_SESSION["errors"] = $result["errors"];
    $_SESSION["formData"] = $formData;

    if ($result["success"]) {
        header("Location: ../pages/login.php");

        exit();
    } else {
        header("Location: ../pages/register.php");

        exit();
    }

}

register();