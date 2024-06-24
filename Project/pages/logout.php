<?php
require_once "../models/User.php";

session_start();


?>

<html>

<head>
    <title>Logout</title>
    <link rel="stylesheet" href="../css/createEditJson.css" />

</head>

<body>
    <nav class="main-nav">
        <a href="./home.php">Home </a>
        <a href="./importGameJson.php">Import game</a>
        <a href="./logout.php">Logout</a>
        <a href="./gamesJson.php">Games list</a>
        <a href="./createJsonFrom.php">Create game</a>

    </nav>
    <h2>Logout</h2>

    <form action="../controllers/logoutController.php" method="POST">
        <button type="submit">Logout</button>
    </form>
    <footer class="footer-bottom">
        <p>2024 . All rights reserved.</p>
    </footer>
</body>

</html>