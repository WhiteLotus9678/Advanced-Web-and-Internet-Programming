<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Module 1.1 - Movie Browser</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <style>
    /* TODO: adjust the movieSummary class to achieve the following
     *   - Add a solid 1 pixel black border
     *   - Make the text centered
     *   - add 5 pixel padding all around
     **/
    .movieSummary {
      margin-bottom: 15px;
      vertical-align: bottom;
	  border-width: 1px;
	  border-color: black;
	  text-align: center;
	  padding:: 5px; }
    .summaryTitle { display: block; height: 40px; }
    .summaryInfo { display: block; height: 60px; }
    </style>
  </head>
  <body>

    <div class='container'>
      <div class='row'>      
        <div class='page-header'>
          <h1>MyFlix Movie Browser <small>Click on a movie below for more information.</small></h1>
        </div>
      </div>
<?php
// Establish the database connection
include "database.php";
$db = connectToDatabase(DBDeets::DB_NAME_MYFLIX);
if($db == NULL) { die("<p>Connection Error: " . $stmt->error . "</p></body></html>\n"); }

// Prepare and execute a query for the basic movie information
// TODO: Fill in the Query below to retrieve the following values from the 'movies' table
//    - id, title, year, genres, image, rated
$stmt = simpleQuery($db, 'SELECT id, title, year, genres, image, rated FROM movies');
if($stmt == NULL) { die("<p>SQL Query Error: " . $stmt->error . "</p></body></html>\n"); }

// Bind variables to the results (same order as in the query)
$stmt->bind_result($movieID, $movieName, $movieYear, $movieGenre, $movieImage, $movieRating);

//Process the resutls and output in bootstrap grid form
echo "      <div class='row'>\n";

while($stmt->fetch()) {
        // Output a cell for the current movie
?>
        <div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>
          <div class='movieSummary'>
            <a href='movieDetails.php?movieID=<?=$movieID?>'>
              <!-- TODO: Output a span with the 'summaryTitle' class containing the movie name -->
              <p> <span class="summaryTitle"> <?=$movieName?> </span> </p>
              <!-- TODO: Output an image tag using the 'image' value from the database
                         note: you will need to provide the proper path to the thumbs folder -->
              <img src="images/thumbs/<?=$movieImage?>" alt="movie image">
            </a><br>
            <!-- TODO: Inside one large span with the 'summaryInfo' class, output the movie genres
              on one line and the year and rating on another line -->
              <p> <span class="summaryInfo"> Movie Genre(s): <?=$movieGenre?> <br/> Year: <?=$movieYear?>, Rating: <?=$movieRating?> </span> </p>
          </div> <!-- /movieSummary -->
        </div> <!-- /col* -->
<?php
} //end of while loop

echo "      </div> <!-- /row -->\n";

// Close the database connection
$stmt->close();
$db->close();
?>

    </div> <!-- /container -->

    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
  </body>
</html>