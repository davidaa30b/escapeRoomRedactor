<?php
require_once "../models/Database.php";

$database = new Database();
$lockers = $database->getAllLockers();
header('Content-Type: application/json'); // Ensure the response is JSON

echo json_encode($lockers);