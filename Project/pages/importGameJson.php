<?php
require_once "../models/User.php";

session_start();
$error = isset($_SESSION["error"]) ? $_SESSION["error"] : "";

unset($_SESSION["error"]);

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
    <h2>Add game json</h2>

    <form action="../controllers/importGameJsonController.php" method="POST" enctype="multipart/form-data">
        <section><label>Name: <input id="name" type="text" name="name"></label></section>
        <section>
            <label for="fileUpload">Select a json file file:</label>
            <input type="file" id="fileUpload" name="fileUpload" accept=".json">

        </section>
        <section><label>Status: <input id="status" type="text" name="status"></label></section>
        <section><label>Category: <input id="category" type="text" name="category"></label></section>
        <button type="submit">Submit</button>
    </form>





    <?php if (isset($error)): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>
</body>

</html>