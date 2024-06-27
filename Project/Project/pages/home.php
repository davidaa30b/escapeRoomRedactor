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
        <a href="./createLocker.php">Create locker</a>

    </nav>
    <h2>Home</h2>
    <h5>Welcome home, <?php echo $email; ?></h5>
    <article>
        <ul>If you want to:<br>
            <li> Import your own file into the system go to "Imort Game"</li>
            <li> View your saved files go to "Games list". There you can download, edit or view your files.</li>
            <li> To create your own file from the beginning go to "Create game "</li>
        </ul>
    </article>
    <footer class="footer-bottom">
        <p>2024 . All rights reserved.</p>
    </footer>
</body>

</html>