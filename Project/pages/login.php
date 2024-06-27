<?php
require_once "../models/User.php";

session_start();

$errors = isset($_SESSION['errors']) ? $_SESSION['errors'] : [];
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];

unset($_SESSION['errors']);
unset($_SESSION['formData']); ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Sign in</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src="../scripts/script.js"></script>
    <link rel="stylesheet" href="../css/createEditJson.css" />

</head>

<body>
    <h2>Login</h2>

    <form method="POST" action="../controllers/loginController.php">
        <section class="locker_section data_contains">
            <div>
                <label for="email">E-mail</label>
                <input id="email" type="text" name="email"
                    value="<?php echo isset($formData['email']) ? $formData['email'] : ''; ?>" />
                <?php if (isset($errors['emailError'])): ?>
                    <div class="error"><?php echo $errors['emailError']; ?></div>
                <?php endif; ?>
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" type="password" name="password" />
                <input type="checkbox" id="showPassword"> Show Pass
                <?php if (isset($errors['passwordError'])): ?>
                    <div class="error"><?php echo $errors['passwordError']; ?></div>
                <?php endif; ?>
            </div>
            <div>
                <button type="submit" id="login">Sign in</button>
                <div>No account? <a href="./register.php">Sign up!</a></div>
            </div>
        </section>
    </form>
    <footer class="footer-bottom">
        <p>2024 . All rights reserved.</p>
    </footer>
</body>

</html>