// Import express and create a router
import Express from 'express'

// Import the raw movie data
import gameData from './games'

const router = new Express.Router()
const gamesReduced = summaryOnly(gameData)

// Data endpoint for all games
router.get('/allGames', (req, res) => {
    // res.send({ description: 'All Games Endpoint' })
    
    res.send(gamesReduced)
    
    console.log('/allGames endpoint reached')
})

// Data endpoint for a single game
router.get('/game/:id', (req, res) => {
    // res.send({ description: 'Single Game Endpoint' })
    let myGame = gameData.find((game) => {
        return (game.id === parseInt(req.params.id))
    })

    if (myGame !== undefined) {
        res.send(myGame)
    } else {
        res.send({ message: 'id not found in BGG DB'})
    }
    
    console.log('/game endpoint reached')
})

// Express router to be imported somwhere else
exports.router = router

function summaryOnly(data) {
    // Remap data to a reduced form
    let mappedData = data.map((game) => {
        // Build and return a game summary
        let gameSummary = {
            id: game.id,
            name: game.name,
            year: game.year,
            minPlayers: game.minPlayers,
            maxPlayers: game.maxPlayers
        }
        return gameSummary
    })

    // Return the summary array
    return mappedData
}