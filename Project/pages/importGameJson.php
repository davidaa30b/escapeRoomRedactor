<?php
require_once "../models/User.php";

session_start();
$errors = isset($_SESSION['errors']) ? $_SESSION['errors'] : [];
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];

unset($_SESSION['errors']);
unset($_SESSION['formData']); ?>



<html>

<head>
    <title>Add game</title>
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
    <h2>Add game json</h2>

    <form action="../controllers/importGameJsonController.php" method="POST" enctype="multipart/form-data">
        <section class="info_section_game data_contains">
            <label>Name: <input id="name" type="text" name="name" class="input_values"
                    value="<?php echo isset($formData['name']) ? $formData['name'] : ''; ?>" readonly />
                <?php if (isset($errors['nameError'])): ?>
                    <div class="error"><?php echo $errors['nameError']; ?></div>
                <?php endif; ?>
            </label>

            <label for="fileUpload">Select a json file file:</label>
            <input type="file" id="fileUpload" name="fileUpload" accept=".json">
            <?php if (isset($errors['filePathError'])): ?>
                <div class="error"><?php echo $errors['filePathError']; ?></div>
            <?php endif; ?>

            <label>Status: <input id="status" type="text" name="status" class="input_values"
                    value="<?php echo isset($formData['status']) ? $formData['status'] : ''; ?>" readonly />
                <?php if (isset($errors['statusError'])): ?>
                    <div class="error"><?php echo $errors['statusError']; ?></div>
                <?php endif; ?>
            </label>

            <label>Category: <input id="category" type="text" name="category" class="input_values"
                    value="<?php echo isset($formData['category']) ? $formData['category'] : ''; ?>" readonly />
                <?php if (isset($errors['categoryError'])): ?>
                    <div class="error"><?php echo $errors['categoryError']; ?></div>
                <?php endif; ?>
            </label>


            <button type="submit">Import</button>
        </section>
    </form>



    <footer class="footer-bottom">
        <p>2024 . All rights reserved.</p>
    </footer>

</body>

</html>