<?php
require_once "../models/User.php";

session_start();
if (isset($_SESSION["user"]) && $_SESSION["user"]->getEmail() != "") {
    $email = $_SESSION["user"]->getEmail();
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
        const username = <?php echo "'$email'"; ?>;
        const gameContent = <?php echo "'empty'"; ?>;
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

    <h2>Create Json Form </h2>
    <button id="note-pad-edit-button">Create without formating</button>
    <section id="text-area-json"></section>
    <section id="game_json_form"></section>
    <section id="ending"></section>

</body>

</html>