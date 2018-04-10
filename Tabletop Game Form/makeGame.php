<?php

// Response header
header('Content-Type: text/html');

// Extract the JSON string from the body of the HTTP request
$entityBody = file_get_contents('php://input');

if(isset($entityBody))
{
    // Decode the body from a JSON string to a PHP object
    $newGame = json_decode($entityBody);
    
    // Default properties if there is no data provided for in the JSON string
    if(!isset($newGame->name))
    {
        $newGame->name = "No title provided.";
    }

    if(!isset($newGame->year))
    {
        $newGame->year = 2018;
    }

    if(!isset($newGame->rating))
    {
        $newGame->rating = 0.0;
    }

    if(!isset($newGame->minPlayerCount))
    {
        $newGame->minPlayerCount = 2;
    }

    if(!isset($newGame->maxPlayerCount))
    {
        $newGame->maxPlayerCount = 4;
    }

    if(!isset($newGame->minPlaytime))
    {
        $newGame->minPlaytime = 10;
    }

    if(!isset($newGame->maxPlaytime))
    {
        $newGame->maxPlaytime = 15;
    }

    if(!isset($newGame->minAge))
    {
        $newGame->minAge = 4;
    }

    if(!isset($newGame->designer))
    {
        $newGame->designer = "No designer(s) provided.";
    }

    if(!isset($newGame->artist))
    {
        $newGame->artist = "No artist(s) provided.";
    }

    if(!isset($newGame->publisher))
    {
        $newGame->publisher = "No publisher(s) provided.";
    }

    // 1. Connect to the database
    include "database.php";
    $db = connectToDatabase(DBDeets::DB_NAME_MYGAME);
    // Database conenction error
    if ($db->connect_error) {
        http_response_code(500);
        die('{ "errMessage": "Failed to Connect to DB." }');
    }

    // 2. Run the Query
    $query = "INSERT INTO games (id, name, year, rating, minPlayerCount, maxPlayerCount, minPlaytime, maxPlaytime, minAge, designer, artist, publisher) VALUES (" . $newGame->id . ", '" . $newGame->name . "', " . $newGame->year . ", " . $newGame->rating . ", " . $newGame->minPlayerCount . ", " . $newGame->maxPlayerCount . ", " . $newGame->minPlaytime . ", " . $newGame->maxPlaytime . ", " . $newGame->minAge . ", '" . $newGame->designer . "', '" . $newGame->artist . "', '" . $newGame->publisher . "');";
    // Simple query without parameters
    $stmt = simpleQuery($db, $query);
    if($stmt == NULL) {
        http_response_code(500);
        die('{ "errMessage": "Error running query." }');
    }

    // 3. Check Affected Rows
    if($stmt->affected_rows != 1) {
        http_response_code(500);
        die('{ "errMessage": "Insertion failed, affected rows != 1." }');
    }

} else {
    // Bad request
    http_response_code(400);
    die('{ "errMessage": "No body provided." }');
}

?>