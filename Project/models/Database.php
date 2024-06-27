<?php
require_once "../validating/validate.php";
require_once "../models/Game.php";
//use \PDO;


class Database
{
    private $connection;


    public function __construct()
    {
        $host = 'localhost';
        $db = 'escaperoom';
        $user = 'root';
        $pass = "";

        try {
            $this->connection = new PDO("mysql:host={$host};dbname={$db}", $user, $pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function registerUser($email, $password, $firstName, $lastName)
    {
        $result = [];

        $errors = validateRegisterUser($email, $password, $firstName, $lastName, $this->connection);

        $result["errors"] = $errors;
        $result["success"] = false;

        if (
            $errors["emailError"] != "" || $errors["passwordError"] != "" ||
            $errors["firstNameError"] != "" || $errors["lastNameError"] != ""
        ) {
            return $result;
        }

        $queryString = "INSERT INTO users (firstName,lastName, email, password) VALUES (?, ?, ?,?)";

        try {
            $stmt = $this->connection->prepare($queryString);
            $success = $stmt->execute([$firstName, $lastName, $email, $password]);
            $result["success"] = $success;
            return $result;

        } catch (PDOException $e) {
            return false;
        }
    }

    public function loginUser($email, $password)
    {
        $result = [];

        $errors = emailExists($email, $this->connection);
        $result["errors"] = $errors;
        $result["success"] = false;


        if ($errors["emailError"] != "Email already exists") {
            $errors["emailError"] = "Email is not registered";
            $result["errors"] = $errors;
            return $result;
        }

        $queryString = "SELECT firstName,lastName,email,password FROM users WHERE email = (?)";
        try {
            $stmt = $this->connection->prepare($queryString);
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user["password"] == $password) {
                $result["user"] = $user;
                $result["success"] = true;
                return $result;
            } else {
                $errors["emailError"] = "";
                $errors["passwordError"] = "The password is incorrect.";
                $result["errors"] = $errors;
                return $result;
            }

        } catch (PDOException $e) {
            return false;
        }
    }



    public function addGameJson($name, $content, $status, $category)
    {
        $result = [];

        $errors = validatGamesJson($name, $content, $status, $category, $this->connection);

        $result["errors"] = $errors;
        $result["success"] = false;

        if (
            $errors["nameError"] != "" || $errors["filePathError"] != "" ||
            $errors["statusError"] != "" || $errors["categoryError"] != ""
        ) {
            return $result;
        }


        $queryString = "INSERT INTO games (name,content,status,category) VALUES (?, ?, ?, ?)";

        try {
            $stmt = $this->connection->prepare($queryString);
            $success = $stmt->execute([$name, $content, $status, $category]);
            $result["success"] = $success;
            return $result;

        } catch (PDOException $e) {
            $result["error"] = $e->getMessage();
            return $result;
        }
    }

    public function getListOfGames()
    {
        $result = [];

        $queryString = "SELECT * FROM games";
        try {
            $statement = $this->connection->prepare($queryString);
            $statement->execute();
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

            $games = [];
            foreach ($rows as $row) {
                $game = new Game($row["id"], $row["name"], $row["content"], $row["status"], $row["category"]);
                $games[] = $game;
            }
            $result["games"] = $games;
            return $result;

        } catch (PDOException $e) {
            $result["error"] = $e->getMessage();
            return $result;
        }

    }

    public function getGameById($id)
    {
        $result = [];

        $queryString = "SELECT * FROM games WHERE id = (?)";
        try {
            $statement = $this->connection->prepare($queryString);
            $statement->execute([$id]);
            $row = $statement->fetch();
            $game = new Game($row["id"], $row["name"], $row["content"], $row["status"], $row["category"]);
            $result["game"] = $game;
            return $result;

        } catch (PDOException $e) {
            $result["error"] = $e->getMessage();
            return $result;
        }

    }

    public function deleteGameById($id)
    {
        $result = [];
        $result["success"] = false;
        $queryString = "DELETE FROM games WHERE id = ?";
        try {
            $stmt = $this->connection->prepare($queryString);
            $stmt->execute([$id]);
            $result["success"] = true;
            return $result;
        } catch (PDOException $e) {
            $result["error"] = $e->getMessage();
            return $result;
        }
    }

    public function updateGameJson($id, $name, $content, $status, $category)
    {
        $result = [];
        $result["success"] = false;

        $queryString = "UPDATE games SET name = :name, content = :content,status = :status, category = :category WHERE id = :id";
        try {
            $stmt = $this->connection->prepare($queryString);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':category', $category);
            $success = $stmt->execute();
            $result["success"] = $success;

        } catch (PDOException $e) {
            $result["error"] = $e->getMessage();
        }

        return $result;

    }

    public function addLocker($regex, $answer, $urlsNum, $logo, $usrls, $type, $attemptsNumber, $showAttempts, $points, $forceOrder, $resourcesNum, $resources)
    {

        $result["success"] = false;
        $result["error"] = "";

        $queryString = "INSERT INTO lockers (regex,answer,urlsNum,logo,usrls,type,attemptsNumber,showAttempts, points,forceOrder, resourcesNum, resources) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?)";

        try {
            $stmt = $this->connection->prepare($queryString);
            $success = $stmt->execute([$regex, $answer, $urlsNum, $logo, $usrls, $type, $attemptsNumber, $showAttempts, $points, $forceOrder, $resourcesNum, $resources]);
            $result["success"] = $success;
            return $result;

        } catch (PDOException $e) {
            $result["error"] = $e->getMessage();
            return $result;
        }
    }

    public function getAllLockers()
    {
        $queryString = "SELECT * FROM lockers";
        $stmt = $this->connection->prepare($queryString);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


}

