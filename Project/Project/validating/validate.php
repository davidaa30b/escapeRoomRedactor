<?php
function isValidEmail($email)
{
    // Define the regex pattern for validating email addresses
    $pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
    return preg_match($pattern, $email);
}

function isEmpty($field)
{
    return $field == "";
}

function emailExists($email, $connection)
{
    $errors = [];
    $queryString = "SELECT email FROM users WHERE email = (?)";
    try {
        $stmt = $connection->prepare($queryString);
        $stmt->execute([$email]);
        $emailExists = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($emailExists) {
            $errors["emailError"] = "Email already exists";
        } else {
            if (isValidEmail($email)) {
                $errors["emailError"] = "";
            } else {
                $errors["emailError"] = "Email entered is in incorrect format";
            }
        }
        return $errors;

    } catch (PDOException $e) {
        return false;
    }

}

function gameNameExists($name, $connection)
{
    $errors = [];
    $queryString = "SELECT name FROM games WHERE name = (?)";
    try {
        $stmt = $connection->prepare($queryString);
        $stmt->execute([$name]);
        $emailExists = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($emailExists) {
            $errors["nameError"] = "Game with this name already exists";
        } else {
            $errors["nameError"] = "";
        }
        return $errors;

    } catch (PDOException $e) {
        return false;
    }

}

function validateRegisterUser($email, $password, $firstName, $lastName, $connection)
{
    $errors = emailExists($email, $connection);
    $errors["passwordError"] = "";
    $errors["firstNameError"] = "";
    $errors["lastNameError"] = "";

    if (isEmpty($password)) {
        $errors["passwordError"] = "Password filed is required";
    }
    if (isEmpty($firstName)) {
        $errors["firstNameError"] = "First name filed is required";
    }
    if (isEmpty($lastName)) {
        $errors["lastNameError"] = "Last name filed is required";
    }


    return $errors;
}

function validatGamesJson($name, $filePath, $status, $category, $connection)
{
    $errors = gameNameExists($name, $connection);
    $errors["filePathError"] = "";
    $errors["statusError"] = "";
    $errors["categoryError"] = "";


    if (isEmpty($name)) {
        $errors["nameError"] = "Name filed is required";
    }

    if (isEmpty($filePath)) {
        $errors["filePathError"] = "Providing a file is required";
    }
    if (isEmpty($status)) {
        $errors["statusError"] = "Status filed is required";
    }
    if (isEmpty($category)) {
        $errors["categoryError"] = "Category filed is required";
    }


    return $errors;
}