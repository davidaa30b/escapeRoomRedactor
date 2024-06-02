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