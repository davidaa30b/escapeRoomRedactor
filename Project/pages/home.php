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
</head>

<body>
    <nav>
        <a href="./home.php">Home </a>
        <a href="./importGameJson.php">Import game</a>
        <a href="./logout.php">Logout</a>
        <a href="./gamesJson.php">Games list</a>
        <a href="./createJsonFrom.php">Create game</a>
    </nav>
    <h2>Home</h2>
    <h5>Welcome home, <?php echo $email; ?></h5>

</body>

</html>