<?php

// Indicate JSON data type
header('Content-Type: application/json'); // CASE-SENSITIVE

if(isset($_GET['id']))
{
    // Get ID of movie from form GET data
    $gameID = $_GET['id'];

    // 1. Connect to the database
    include "database.php";
    $db = connectToDatabase(DBDeets::DB_NAME_MYGAME);
    if ($db->connect_error) {
        http_response_code(500); // Connection error
        die('{ "errMessage": "Failed to Connect to DB." }');
    }

    // 2. Run the Query
    $query = "SELECT name,year,rating,minPlayerCount,maxPlayerCount,minPlaytime,maxPlaytime,minAge,designer,artist,publisher FROM games WHERE id=?;";
    $stmt = simpleQueryParam($db, $query, "i", $gameID);
    if($stmt == NULL) {
        http_response_code(500);
        die('{ "errMessage": "Error running query." }');
    }

    // 3. Bind and access the result variables
    if(!$stmt->bind_result($gameName, $gameYear, $gameRating, $gameMinPC, $gameMaxPC, $gameMinPT, $gameMaxPT,
        $gameMinAge, $gameDesigner, $gameArtist, $gamePublisher)) {
        http_response_code(500);
        die('{ "errMessage": "Failed to bind to results." }');
    }

    // 4. Fetch and display the results
    if($stmt->fetch()) {
        ?>

{
  "ID": <?=json_encode($gameID)?>,
  "name": <?=json_encode($gameName)?>,
  "year": <?=json_encode($gameYear)?>,
  "rating": <?=json_encode($gameRating)?>,
  "minPC": <?=json_encode($gameMinPC)?>,
  "maxPC": <?=json_encode($gameMaxPC)?>,
  "minPT": <?=json_encode($gameMinPT)?>,
  "maxPT": <?=json_encode($gameMaxPT)?>,
  "minAge": <?=json_encode($gameMinAge)?>,
  "designer": <?=json_encode($gameDesigner)?>,
  "artist": <?=json_encode($gameArtist)?>,
  "publisher": <?=json_encode($gamePublisher)?>

}

<?php
    } else {
        http_response_code(404); // Page not found (shows up in)
        die('{ "errMessage": "Resource not found."}');
    }

} else {
    // No game ID provided
    
    // Connect to the database
    include "database.php";
    $db = connectToDatabase(DBDeets::DB_NAME_MYGAME);
    if ($db->connect_error) {
        http_response_code(500); // Connection error
        die('{ "errMessage": "Failed to Connect to DB." }');
    }

    // TO-DO: reduce query
    // Prepare and execute a query for the basic movie information
    $stmt = simpleQuery($db, 'SELECT id,name,year,rating FROM games');
    if($stmt == NULL) {
        http_response_code(500);
        die('{ "errMessage": "Error running query." }');
    }

    // Bind variables to the results (same order as in the query)
    if(!$stmt->bind_result($gameID,$gameName, $gameYear, $gameRating)) {
        http_response_code(500);
        die('{ "errMessage": "Failed to bind to results." }');
    }

    $gameArray = array();

    while($stmt->fetch()){
        array_push($gameArray,
            (object) array(
                "ID" => $gameID,
                "name" => $gameName,
                "year" => $gameYear,
                "rating" => $gameRating
            )
        );
    } //end of while loop
            
    #print "[";
    $length = count($gameArray); //count($array)
    print "{\n";
    print "  \"length\": $length,\n";
    print "  \"list\": ";
    print_r(json_encode($gameArray));
    print "}\n";
    #print "]";

    // Close the database connection
    $stmt->close();
    $db->close();
}       
?>