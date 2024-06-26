<?php
require_once "../models/User.php";

session_start();

if (isset($_SESSION["user"]) && $_SESSION["user"]->getEmail() != "") {
    $email = $_SESSION["user"]->getEmail();
}
?>

<html>

<head>
    <title>Home</title>
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
    <h2>Home</h2>
    <h5>Welcome home, <?php echo $email; ?></h5>
    <footer class="footer-bottom">
        <p>2024 . All rights reserved.</p>
    </footer>
</body>

</html>