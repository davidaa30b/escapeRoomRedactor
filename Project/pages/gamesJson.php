<?php
require_once "../controllers/listGamesJsonController.php";
require_once "../models/User.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$error = isset($_SESSION["error"]) ? $_SESSION["error"] : "";
$games = isset($_SESSION["games"]) ? $_SESSION["games"] : "";
$deleteOutput = isset($_SESSION["deleteOutput"]) ? $_SESSION["deleteOutput"] : "";
$uploadResult = isset($_SESSION["uploadResult"]) ? $_SESSION["uploadResult"] : "";
$errorResult = isset($_SESSION["errorResult"]) ? $_SESSION["errorResult"] : "";

unset($_SESSION["error"]);
unset($_SESSION["games"]);
unset($_SESSION["deleteOutput"]);
unset($_SESSION["uploadResult"]);
unset($_SESSION["errorResult"]);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/createEditJson.css" />

    <title>Games Json List</title>
    <script>

    </script>
</head>

<body>

    <nav class="main-nav">
        <a href="./home.php">Home </a>
        <a href="./importGameJson.php">Import game</a>
        <a href="./logout.php">Logout</a>
        <a href="./gamesJson.php">Games list</a>
        <a href="./createJsonFrom.php">Create game</a>

    </nav>
    <h2>Games Json List</h2>

    <section>
        <?php
        if ($games == "") {
            echo "<section> No data avaiable </section>";
            echo "<section class='error-message-action'> " . $error . " </section>";
        } else {
            echo "<section class='table-container'>";
            echo "<table class='games-table'><tr><th>Name</th><th>Status</th><th>Category</th><th>Content</th><th>Action</th></tr>";
            foreach ($games as $game) {
                echo
                    "<tr> 
                        <td>" . $game->getName() . "</td>
                        <td>" . $game->getStatus() . "</td>
                        <td>" . $game->getCategory() . "</td>
                        <td> 
                             <a href='viewOrDownloadJson.php?action=download&id=" . $game->getId() . "'>Download JSON</a> 
                        </td>
                        <td> 
                            <a href='editJsonForm.php?id=" . $game->getId() . "'>Edit</a>
                        </td>
                      
                        <td> 
                            <a href='../controllers/deleteGameController.php?id=" . $game->getId() . "' onclick=\"return confirm('Are you sure you want to delete this game?');\">Delete</a>
                        </td>
                    </tr>";
            }
            echo "</table>";
            echo "</section>";
        }
        ?>
    </section>

    <?php if ($deleteOutput != ""): ?>
        <section id="deleteOutputSection" class="success-message-action"><?php echo $deleteOutput; ?></section>
    <?php endif; ?>

    <?php if ($uploadResult != ""): ?>
        <section id="uploadResultSection" class="success-message-action"><?php echo $uploadResult; ?></section>
    <?php endif; ?>

    <?php if ($errorResult != ""): ?>
        <section id="errorResultSection" class="error-message-action"><?php echo $errorResult; ?></section>
    <?php endif; ?>
    <footer class="footer-bottom">
        <p>2024 . All rights reserved.</p>
    </footer>
</body>

</html>