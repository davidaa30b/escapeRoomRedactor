<?php
require_once "../models/Database.php";
require_once "../models/User.php";
require_once "../models/Game.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

function showGamesJson()
{
    $db = new Database();
    $result = $db->getListOfGames();

    if (isset($result["error"])) {
        $_SESSION["error"] = $result["error"];
        //"Failure retriving data ...";
    } else {
        $_SESSION["games"] = $result["games"];
    }


}

showGamesJson();
