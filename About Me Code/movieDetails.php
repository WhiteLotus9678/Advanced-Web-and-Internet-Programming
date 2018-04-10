<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Module 1.1 - Movie Details</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
  </head>
  <body>

    <div class='container'>
      <div class='row'>      
        <div class='page-header'>
          <h1>MyFlix Movie Details</h1>
        </div>
      </div>
<?php
    if(isset($_GET['movieID']))
    {
        // Get ID of movie from form GET data
        $movieID = $_GET['movieID'];

        // 1. Connect to the database
        include "database.php";
        $db = connectToDatabase(DBDeets::DB_NAME_MYFLIX);
        if ($db->connect_error) {
            die('<p>Connection failed: ' . $DBconn->connect_error . '</p></div></body></html>');
        }

        // 2. Run the Query
        $query = "SELECT title,year,rated,imdbrating,description,image,genres,directors,writers,actors FROM movies WHERE id=?;";
        $stmt = simpleQueryParam($db, $query, "s", $movieID);
        if($stmt == NULL) {
            die('</div></body></html>');
        }

        // 3. Bind and access the result variables
        if(!$stmt->bind_result($movieName, $movieYear, $movieRated, $movieIMDB, $movieDesc, $movieImage,
          $movieGenres, $movieDirectors, $movieWriters, $movieActors)) {
            die('<p>Query Result Binding Failed: ' . $stmt->error . '</p></div></body></html>');
        }

        // Fetch and display the results
        if($stmt->fetch()) {
          // TODO: Adjust the following to present all of this information in a more 
          // organized format. You must use an image tag to display the full resolution
          // poster, a table to organize all the data (or the Bootstrap column system),
          // and CSS to keep things looking styled similar to the movieBrowse page.
          // Feel free to use Bootstrap classes to achieve better styling.
          ?>
        <table border="1">
        	<tr>
            	<td rowspan="11"> <img src="images/posters/<?=$movieImage?>" alt="movie image"> </td>
                <th> <b> Movie Details </b> </th>
            </tr>
            
            <tr>
            	<td> <b> Movie ID: </b> <?=$movieID?> </td>
            </tr>
            
            <tr>
            	<td> <b> Movie Title: </b> <?=$movieName?> </td>
            </tr>
            
            <tr>
            	<td> <b> Genres: </b> <?=$movieGenres?> </td>
            </tr>
            
            <tr>
            	<td> <b> Release Year: </b> <?=$movieYear?> </td>
            </tr>
            
            <tr>
            	<td> <b> Rating: </b> <?=$movieRated?> </td>
            </tr>
            
            <tr>
            	<td> <b> IMDB Score: </b> <?=$movieIMDB?> </td>
            </tr>
            
            <tr>
            	<td> <b> Description: </b> <?=$movieDesc?> </td>
            </tr>
            
            <tr>
            	<td> <b> Movie Directors: </b> <?=$movieDirectors?> </td>
            </tr>
            
            <tr>
            	<td> <b> Movie Writers: </b> <?=$movieWriters?> </td>
            </tr>
            
            <tr>
            	<td> <b> Movie Actors: </b> <?=$movieActors?> </td>
            </tr>
            
        </table>
          <?php
        }

    } else { ?>
        <p>Error: no movie ID provided.</p>
        <?php
    }
?>

    </div> <!-- /container -->

    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
  </body>
</html>