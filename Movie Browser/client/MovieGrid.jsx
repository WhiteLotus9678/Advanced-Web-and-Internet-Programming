// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

// Our custom MovieSummary component
import MovieSummary from './MovieSummary.jsx'

// A component that shows a full grid of movies
class MovieGrid extends React.Component {
  constructor (props) {
    super(props)

    // Initialize component state
    this.state = {
      // Set to true when the movie data is ready
      ready: false
    }
  }

  // Run code after this is added to the DOM
  componentDidMount () {
    // Query the all-movies API
    fetch('/api/allMovies').then((res) => {
      // Examine response status
      if (res.status !== 200) {
        console.log('error retrieveing movies')
      } else {
        // Decode the JSON and update the state
        res.json().then((data) => {
          // Add movie data to state and indicate
          // the data is ready
          this.setState({
            movies: data,
            ready: true
          })
        })
      }
    })
  }

  render () {
    if (this.state.ready) {
      // Build array of MovieSummary elements
      let summaries = []
      this.state.movies.forEach((movie) => {
        summaries.push(
          <MovieSummary {...movie} key={movie.id}
            triggerDetails={this.props.triggerDetails} />
        )
      })

      // Render the elements in a single row div
      return (
        <div className="row">
          {summaries}
        </div>
      )
    } else {
      // Movies are not yet ready so let the user know
      return (
        <div className="row">
          <div className="col-lg-12">
            <p>Retrieving movies</p>
          </div>
        </div>
      )
    }
  }
}

// Set the type for the trigger details function
MovieGrid.propTypes = {
  triggerDetails: PropTypes.func.isRequired
}

// Expose this component for import in other files
export default MovieGrid
