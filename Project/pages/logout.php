<?php
require_once "../models/User.php";

session_start();


?>

<html>

<head>
    <title>Home</title>
</head>

<body>
    <nav>
        <a href="./home.php">Home </a>
        <a href="./importGameJson.php">Import game</a>
        <a href="./logout.php">Logout</a>
        <a href="./gamesJson.php">Games list</a>
    </nav>
    <h2>Logout</h2>

    <form action="../controllers/logoutController.php" method="POST">
        <button type="submit">Logout</button>
    </form>
</body>

</html>