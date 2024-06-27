<?php
require_once "../models/Database.php";
require_once "../models/Game.php";
require_once "../models/User.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_GET['id'])) {
    die("Invalid request.");
}

$gameId = intval($_GET['id']);

$db = new Database();
$result = $db->deleteGameById($gameId);

if (isset($result['error'])) {
    $_SESSION["errorResult"] = "Failed to delete the game.";
} else {
    $_SESSION["deleteOutput"] = "Game deleted successfully.";
}

header("Location: ../pages/gamesJson.php");
exit();