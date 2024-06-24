<?php
require_once "../models/Database.php";
require_once "../models/Game.php";
require_once "../models/User.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_GET['action']) || !isset($_GET['id'])) {
    die("Invalid request.");
}

$action = $_GET['action'];
$gameId = intval($_GET['id']);

$db = new Database();
$result = $db->getGameById($gameId);

if (isset($result['error']) || !$result) {
    die("Game not found.");
}

$game = $result["game"];
$content = $game->getContent();

$jsonContent = $content;

if ($action === 'view') {
    echo "<pre>" . $jsonContent . "</pre>";
} elseif ($action === 'download') {
    header('Content-Type: application/json');
    header('Content-Disposition: attachment; filename="game_' . $gameId . '.json"');
    echo $jsonContent;
} else {
    die("Invalid action.");
}
