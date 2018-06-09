// HTTP protocol over TSL/SSL
let https = require('https')

// File system API
let fs = require('fs')

// XML to JavaScript object converter
let xml2js = require('xml2js')

// Make an xml2js parser
let parser = new xml2js.Parser()

// Check parser for errors
parser.on('error', function(err) {
    console.log('Parser error', err)
})

// Array to hold boardgame JSON data
let allGames = []

// Write a new and empty JSON file
fs.writeFile('./api/games.json', extractedData, 'utf8', (err) => {
    console.log(err)
})

// Current boardgame information to collect
let curID = 1

// Maximum number of boardgame information to collect
let maxID = 100

// Query boardgame information for 5 seconds
setTimeout(buildJSON, 5000, curID)

// Build JSON data and write it to a JSON file
function buildJSON(startID) {
    // The ID that is currently being checked
    console.log("Current ID: " + startID)

    // HTTPS GET request for XML data
    let request = https.request({
        host: 'www.boardgamegeek.com',
        path: '/xmlapi2/thing?type=boardgame&id=' + startID.toString(),
        method: 'GET'
    }, (resp) => {
        // Request status code
        console.log("Status:" + resp.statusCode)
        
        // Empty data string
        let data = ''
    
        // Check if data has been received and if so, append it
        resp.on('data', (chunk) => {
            data += chunk
        })
    
        // The whole response has been received. Parse and print out the result
        resp.on('end', () => {
            parser.parseString(data, (err, result) => {
                // Output the result of the parsed string
                console.log('FINISHED', err, result)

                // If the game information is invalid then move on the to the next boardgame ID
                // Increment the maxmum number of boardgame information to collect
                try {
                    // Isolate the game
                    let gameRaw = result.items.item[0]

                    // Extract the basic info
                    let newGame = {
                        id: parseInt(gameRaw.$.id),
                        name: gameRaw.name[0].$.value,
                        thumbnail: gameRaw.thumbnail,
                        image: gameRaw.image,
                        year: parseInt(gameRaw.yearpublished[0].$.value),
                        minPlayers: parseInt(gameRaw.minplayers[0].$.value),
                        maxPlayers: parseInt(gameRaw.maxplayers[0].$.value)
                    }

                    // Examine links for more info
                    gameRaw.link.forEach((info) => {
                        switch (info.$.type) {
                            case 'boardgamedesigner':
                            newGame.designer = info.$.value
                            break

                            case 'boardgameartist':
                            newGame.artist = info.$.value
                            break

                            case 'boardgamepublisher':
                            newGame.publisher = info.$.value
                            break
                        }
                    })
        
                    // Append the information
                    allGames.push(newGame)

                    // Increment the current ID
                    curID++
                    
                    if (curID < maxID) {
                        // Move on to the next boardgame ID
                        setTimeout(buildJSON, 5000, curID)
                    } else {
                        // Append the extracted data to a JSON file
                        fs.appendFile('./api/games.json', JSON.stringify(allGames), 'utf8', (err) => {
                            console.log(err)
                        })
                    }
                } catch (err) {
                    // Increment the current ID
                    console.log('id: ' + curID + ' failed')
                    curID++
                    console.log('current id is now: ' + curID) 

                    // Increment the maximum number of boardgame information to colelct
                    maxID++
                    console.log('max id is now: ' + maxID)

                    // Move on the to the incremented ID
                    setTimeout(buildJSON, 5000, curID)
                }
                
            })            
        })
    }).on('error', (err) => {
        console.log(err)
    })

    request.end()
}