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
    <title>Login</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src="../scripts/script.js"></script>
</head>

<body>
    <h2>Register</h2>

    <form method="POST" action="../controllers/registerController.php">
        <div>
            <label for="email">E-mail</label>
            <input id="email" type="text" name="email"
                value="<?php echo isset($formData['email']) ? $formData['email'] : ''; ?>" />
            <?php if (isset($errors['emailError'])): ?>
                <div class="error"><?php echo $errors['emailError']; ?></div>
            <?php endif; ?>
        </div>
        <div>
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" name="firstName" />
            <?php if (isset($errors['firstNameError'])): ?>
                <div class="error"><?php echo $errors['firstNameError']; ?></div>
            <?php endif; ?>
        </div>
        <div>
            <label for="lastName">Last Name</label>
            <input id="lastName" type="text" name="lastName" />
            <?php if (isset($errors['lastNameError'])): ?>
                <div class="error"><?php echo $errors['lastNameError']; ?></div>
            <?php endif; ?>
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" />
            <input type="checkbox" id="showPassword"> Show Password
            <?php if (isset($errors['passwordError'])): ?>
                <div class="error"><?php echo $errors['passwordError']; ?></div>
            <?php endif; ?>
        </div>
        <div>
            <button type="submit" id="login">Register</button>
            <div>Already have an account? <a href="./login.php">Sign in from here</a></div>
        </div>
    </form>
</body>

</html>