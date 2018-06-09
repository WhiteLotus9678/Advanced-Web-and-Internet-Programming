// Import express and create a router
import Express from 'express'

// Import the raw movie data
import movieData from './myflixlatest'

const router = new Express.Router()
const moviesReduced = summaryOnly(movieData)

// Data enpoint for ALL movies
router.get('/allMovies', (req, res) => {
  res.json(moviesReduced)
  console.log('/allMoves endpont reached')
})

// Data endpoint for a single movie
router.get('/movie/:id', (req, res) => {
  let myMovie = movieData.find((movie) => {
    return (movie.id === req.params.id)
  })

  if (myMovie !== undefined) {
    res.json(myMovie)
  } else {
    res.json({ message: 'id not found in DB' })
  }

  console.log('/movie endpont reached')
})

// Build and return a summary only version of movieData
function summaryOnly (data) {
  // Remap data to a reduced form
  let mappedData = data.map((movie) => {
    // Build and return a movie summary
    let movieSummary = {
      id: movie.id,
      name: movie.name,
      image: movie.image,
      year: movie.year,
      genres: movie.genres,
      rated: movie.rated
    }
    return movieSummary
  })

  // Return the summary array
  return mappedData
}

// Exposes router to be imported elsewhere
export default router