/*
// Author: William Yang
// Description: This JavaScript code validates forms to create a tabletop game
// using JSON or by manually filling out multiple input fields.
*/

import Game from './tableTopGame'

var haunt = new Game(1, "Name", 1997, 5, 1, 5, 90, 115, 14, "Jay", "Jake", "John") // Can't do 001 (octal literal)
console.log(haunt.stringify())
console.log(haunt.parse(haunt.stringify()))

// Validates and prints a parsed JSON string
function validateJSONForm(event) {
    event.preventDefault()
    console.log("validating...")

    // The JSON string taken from the input field
    let jsonString = document.forms["jsonForm"]["json"].value

    // regexp checks for a valid JSON
    if (/^[\],:{}\s]*$/.test(jsonString.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        // A new placeholder Game object
        let jsonGame = new Game()

        // Create the XMLHTTP request
        let xmlhttp

        if (window.XMLHttpRequest) {
            // Code for modern browsers
            xmlhttp = new XMLHttpRequest()
        } else {
            // Code for old IE browsers
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }

        // Create a POST request
        xmlhttp.open("POST", "makeGame.php", false)

        // Send the POST request to the myGame database
        xmlhttp.send(jsonString)

    } else {
        
        // Error message
        alert("ERROR: A valid JSON string was not submitted. Please make sure to include all class variables.")
        return false
    }
}

// Validates and prints a string of variables that are a part of the tableTopGame object
function validateManualForm(event) {
    event.preventDefault()

    // A new placeholder Game object
    var manualGame = new Game()

    // Game class variables
    var id, name, year, rating, minPlayerCount, maxPlayerCount, minPlaytime, maxPlaytime, minAge, designer, artist, publisher
    var yearMin = 1990, yearMax = 2018

    // Get the value of the "id" input field
    id = Number(document.forms["manualForm"]["id"].value)

    // Id must be more than 0
    if (id > 0) {
        manualGame.id = id
    } else {
        alert("Please enter an ID integer.")
        return false
    }

    // Get the value of the "name" input field
    name = document.forms["manualForm"]["name"].value

    // Name must not be empty
    if (name != "") {
        manualGame.name = name
    } else {
        alert("NAME ERROR: Please enter a name for the tabletop game.")
        return false
    }
    
    // Get the value of the "year" input field
    year = Number(document.forms["manualForm"]["year"].value)

    // Year must be made from 1990 afterwards
    if (year >= yearMin && year <= yearMax) {
        manualGame.year = year
    } else {
        alert("YEAR ERROR: Please enter a year between 1990 and 2018.")
        return false
    }

    // Get the value of the "rating" input field
    rating = Number(document.forms["manualForm"]["rating"].value)

    // Rating must be from 0 to 10
    if(rating >= 0 && rating <= 10) {
        manualGame.rating = rating
    }else{
        alert("RATING ERROR: Please enter a rating bewteen 0 and 10.")
        return false
    }
    
    // Get the value of the "minPlayerCount" input field
    minPlayerCount = Number(document.forms["manualForm"]["minPlayerCount"].value)

    // Minimum player count must be larger than 1
    if (minPlayerCount >= 1) {
        manualGame.minPlayerCount = minPlayerCount
    } else {
        alert("MIN PLAYER COUNT ERROR: Please enter an integer at least 1 or greater.")
        return false
    }

    // Get the value of the "maxPlayerCount" input field
    maxPlayerCount = Number(document.forms["manualForm"]["maxPlayerCount"].value)

    // Maximum player count must be larger than the minimum player count
    if (maxPlayerCount > minPlayerCount) {
        manualGame.maxPlayerCount = maxPlayerCount
    } else {
        alert("MAX PLAYER COUNT ERROR: Please enter an integer higher than the minimum player count.")
        return false
    }

    // Get the value of the "minPlaytime" input field
    minPlaytime = Number(document.forms["manualForm"]["minPlaytime"].value)

    // Minimum playtime must be larger than 10 minutes
    if (minPlaytime >= 10) {
        manualGame.minPlaytime = minPlaytime
    } else {
        alert("MIN PLAYTIME ERROR: Please enter a playtime of at least 10 minutes or greater.")
        return false
    }

    // Get the value of the "maxPlaytime" input field
    maxPlaytime = Number(document.forms["manualForm"]["maxPlaytime"].value)

    // Maximum playtime must be larger than the minimum playtime
    if (maxPlaytime > minPlaytime) {
        manualGame.maxPlaytime = maxPlaytime
    } else {
        alert("MAX PLAYTIME ERROR: Please enter an integer greater than the minimum playtime.")
        return false
    }

    // Get the value of the "minAge" input field
    minAge = Number(document.forms["manualForm"]["minAge"].value)

    // Minimum required age to play the game must be larger than 4
    if (minAge >= 4) {
        manualGame.minAge = minAge
    } else {
        alert("MIN AGE ERROR: Please enter a minimum age of at least 4 or greater.")
        return false
    }

    // Get the value of the "designer" input field
    designer = document.forms["manualForm"]["designer"].value

    // Designer name must not be empty
    if (designer != "") {
        manualGame.designer = designer
    } else {
        alert("DESIGNER ERROR: Please enter a name for the designer.")
        return false
    }

    // Get the value of the "artist" input field
    artist = document.forms["manualForm"]["artist"].value

    // Artist name must not be empty
    if (artist != "") {
        manualGame.artist = artist
    } else {
        alert("ARTIST ERROR: Please enter a name for the artist.")
        return false
    }

    // Get the value of the "publisher" input field
    publisher = document.forms["manualForm"]["publisher"].value

    // Publisher name must be empty
    if (publisher != "") {
        manualGame.publisher = publisher
    } else {
        alert("PUBLISHER ERROR: Please enter a name for the publisher.")
        return false
    }
    
    // Convert the JavaScript object into JSON text and store that JSON text in a string
    let str_json = manualGame.stringify(manualGame)

    // Create the XMLHTTP request
    let xmlhttp

    // Check the browser before defining the request
    if (window.XMLHttpRequest) {
        // Code for modern browsers
        xmlhttp = new XMLHttpRequest()
    } else {
        // Code for old IE browsers
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }

    // Create a POST request
    xmlhttp.open("POST", "makeGame.php", false)

    // Send the POST request to the myGame database 
    xmlhttp.send(str_json)
}

// Initialize the page once the DOM is ready
$(document).ready(() => {
    // Set the form event handlers
    let jsonForm = $('#jsonForm')
    let manualForm = $('#manualForm')

    // JSON form event handler
    jsonForm.submit((event) => {
        event.preventDefault()

        // Call the function associated with validating the form
        validateJSONForm(event)

        // Append the game information to the webpage
        readGamesFromDB()
    })

    // Manual form event handler
    manualForm.submit((event) => {
        event.preventDefault()

        // Call the function associated with validating the form
        validateManualForm(event)

        readGamesFromDB()
    })

    readGamesFromDB()
})

// Read the game data from the myGame database
function readGamesFromDB() {
    // GET request for the data of all games from the database
    $.get('readGames.php', null, (data, status, jqXHR) => {
        // Clear out the HTML
        $('#gameGrid').html('')

        // data is an array which can use the forEach function
        data.list.forEach((gameData) => {
            let gameSummary = makeGameSummary(gameData)
            $('#gameGrid').append(gameSummary)
        })

        // Update the 'on click' event for all gameButtons
        $('.gameButton').click((event) => {
            event.preventDefault() // Prevent from navigating to the page the movie is linked to
            getGameDetails(event.currentTarget.href)
        })
    })
}

// Build and return the HTML elements for a game summary widget
function makeGameSummary (gameData) {
    // Make a div tag with the needed column classes
    let colDiv = $('<div>')
    colDiv.addClass('col-xs-6 col-sm-4 col-md-3 col-lg-2')

    // Create the game summary as HTML content inside the div tag
    colDiv.html(`
        <div class="gameSummary">
        <a class="gameButton" href="readGames.php?id=${gameData.ID}">
            <span class="summaryTitle">${gameData.name}</span>
        </a><br>
        <span class="summaryInfo">${gameData.year}, ${gameData.rating}/10</span>
    </div>
    `)

    // Return div element
    return colDiv
}

// Get the game details from the myGame database and show them through the modal
function getGameDetails(gameURL) {
    // Rewrite the data with jQuery
    $.get(gameURL, null, (data, status, jqXHR) => {
    
    // Body of the response sent back to us
    // data."ID" neeeds to match the key in makeGame.php
    $('#gameID').text(data.ID)
    $('#gameName').text(data.name)
    $('#gameYear').text(data.year)
    $('#gameRating').text(data.rating)
    $('#gameMinPC').text(data.minPC)
    $('#gameMaxPC').text(data.maxPC)
    $('#gameMinPT').text(data.minPT)
    $('#gameMaxPT').text(data.maxPT)
    $('#gameMinAge').text(data.minAge)
    $('#gameDesigner').text(data.designer)
    $('#gameArtist').text(data.artist)
    $('#gamePublisher').text(data.publisher)

    // Send all of this data to the modal as JSON
    $('#detailsModal').modal()
    }, 'json');
}