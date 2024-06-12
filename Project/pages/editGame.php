<?php
require_once "../models/User.php";
require_once "../models/Database.php";

session_start();


$gameId = intval($_GET['id']);

$db = new Database();
$result = $db->getGameById($gameId);

if (isset($result['error']) || !$result) {
    die("Game not found.");
}

$game = $result["game"];

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
        <a href="./createJsonFrom.php">Create game</a>

    </nav>
    <h2>Add game json</h2>

    <form action="../controllers/updateGameJsonController.php" method="POST" enctype="multipart/form-data">
        <section><input id="game_id" value="<?php echo $game->getId() ?>" hidden="true" name="id"></section>
        <section><label>Name: <input id="name" value="<?php echo $game->getName() ?>" type="text" name="name"></label>
        </section>
        <section>
            <label for="fileUpload">Select a new json file :</label>
            <input type="file" id="fileUpload" name="fileUpload" accept=".json">

        </section>
        <section><label>Status: <input id="status" value="<?php echo $game->getStatus() ?>" type="text"
                    name="status"></label></section>
        <section><label>Category: <input id="category" value="<?php echo $game->getCategory() ?>" type="text"
                    name="category"></label></section>
        <button type="submit">Apply changes</button>
    </form>





    <?php if (isset($error)): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>
</body>

</html>