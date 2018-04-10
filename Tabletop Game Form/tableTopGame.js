/*
// Game class contains information for a tabletop game from
// which information can be printed out of
*/

class Game {
    // Game Constructor
    constructor(id, name, year, rating, minPlayerCount, maxPlayerCount, minPlaytime, maxPlaytime, minAge, designer, artist, publisher) {
        // Game ID (integer)
        this.id = id

        // Game Name (string)
        this.name = name

        // Game Year (integer)
        this.year = year

        // Game Rating (float)
        this.rating = rating

        // Game's Minimum Player Count (integer)
        this.minPlayerCount = minPlayerCount

        // Game's Maximum Player Count (integer)
        this.maxPlayerCount = maxPlayerCount
        
        // Game's Minimum Playtime (integer)
        this.minPlaytime = minPlaytime
        
        // Game's Maximum Playtime (integer)
        this.maxPlaytime = maxPlaytime
        
        // Game Minimum Age Requirement (integer)
        this.minAge = minAge
        
        // Game Designer (string)
        this.designer = designer
        
        // Game Artist (string)
        this.artist = artist
        
        // Game Publisher (string)
        this.publisher = publisher
    }

    // Returns a JSON string representation of the object's properties
    stringify() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            year: this.year,
            rating: this.rating,
            minPlayerCount: this.minPlayerCount,
            maxPlayerCount: this.maxPlayerCount,
            minPlaytime: this.minPlaytime,
            maxPlaytime: this.maxPlaytime,
            minAge: this.minAge,
            designer: this.designer,
            artist: this.artist,
            publisher: this.publisher
        })
    }

    // Set the current game's object properties by parsing the JSON string
    parse(jsonString) {
        if (jsonString != "") {
            return JSON.parse(jsonString)
        } else {
            alert("ERROR: A valid JSON string was not submitted. Please make sure to include all class variables.")
            return false
        }
    }
}

// Allow this class to be imported
export default Game