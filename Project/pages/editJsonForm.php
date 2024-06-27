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

if (isset($_SESSION["user"]) && $_SESSION["user"]->getEmail() != "") {
    $email = $_SESSION["user"]->getEmail();
}

$gameId = intval($_GET['id']);

$db = new Database();
$result = $db->getGameById($gameId);
$gameCon = "";
if (isset($result['error'])) {
    $gameCon = "";
} else {
    $gameCon = $result["game"]->getContent();
    $gameName = $result["game"]->getName();
}



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../css/createEditJson.css" />
    <script>
        const gameContent = <?php echo $gameCon; ?>;
        const gameId = <?php echo $gameId; ?>;
        const username = <?php echo "'$email'"; ?>;
    </script>
    <script src="../scripts/createEditJson.js" defer></script>
</head>

<body>
    <nav class="main-nav">
        <a href="./home.php">Home </a>
        <a href="./importGameJson.php">Import game</a>
        <a href="./logout.php">Logout</a>
        <a href="./gamesJson.php">Games list</a>
        <a href="./createJsonFrom.php">Create game</a>
        <a href="./createLocker.php">Create locker</a>

    </nav>

    <h2>Edit Form </h2>
    <h3>Editting at the moment game : <?php echo $gameName; ?></h3>
    <button id="note-pad-edit-button">Edit without formating</button>
    <section id="text-area-json"></section>
    <section id="game_json_form"></section>
    <section id="ending"></section>
</body>

</html>