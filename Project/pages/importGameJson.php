<?php
require_once "../models/User.php";

session_start();
$errors = isset($_SESSION['errors']) ? $_SESSION['errors'] : [];
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];

unset($_SESSION['errors']);
unset($_SESSION['formData']); ?>



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

    <form action="../controllers/importGameJsonController.php" method="POST" enctype="multipart/form-data">
        <section>
            <label>Name: <input id="name" type="text" name="name"
                    value="<?php echo isset($formData['name']) ? $formData['name'] : ''; ?>" />
                <?php if (isset($errors['nameError'])): ?>
                    <div class="error"><?php echo $errors['nameError']; ?></div>
                <?php endif; ?>
            </label>
        </section>
        <section>
            <label for="fileUpload">Select a json file file:</label>
            <input type="file" id="fileUpload" name="fileUpload" accept=".json">
            <?php if (isset($errors['filePathError'])): ?>
                <div class="error"><?php echo $errors['filePathError']; ?></div>
            <?php endif; ?>
        </section>
        <section>
            <label>Status: <input id="status" type="text" name="status"
                    value="<?php echo isset($formData['status']) ? $formData['status'] : ''; ?>" />
                <?php if (isset($errors['statusError'])): ?>
                    <div class="error"><?php echo $errors['statusError']; ?></div>
                <?php endif; ?>
            </label>
        </section>
        <section>
            <label>Category: <input id="category" type="text" name="category"
                    value="<?php echo isset($formData['category']) ? $formData['category'] : ''; ?>" />
                <?php if (isset($errors['categoryError'])): ?>
                    <div class="error"><?php echo $errors['categoryError']; ?></div>
                <?php endif; ?>
            </label>

        </section>
        <button type="submit">Submit</button>
    </form>





</body>

</html>