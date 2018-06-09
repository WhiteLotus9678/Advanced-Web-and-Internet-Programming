// Bring in the react library
import React from 'react'

import MovieGrid from './MovieGrid.jsx'
import MovieDetailsModal from './MovieDetailsModal.jsx'

// The larger movie browser that contains both a grid and the modal details
class MovieBrowser extends React.Component {
  constructor (props) {
    super(props)

    // Bind the triggerDetailsUpdate funciton to always
    // have the current object as its 'this' param
    this.triggerDetailsUpdate = this.triggerDetailsUpdate.bind(this)

    // Initialize to an empty state
    this.state = {}
  }

  render () {
    if (this.state.movieID) {
      // If the movieID is defined then render the modal too
      return (
        <div>
          <MovieGrid triggerDetails={this.triggerDetailsUpdate} />
          <MovieDetailsModal id={this.state.movieID} />
        </div>
      )
    } else {
      // Render only the grid
      return (
        <div>
          <MovieGrid triggerDetails={this.triggerDetailsUpdate} />
        </div>
      )
    }
  }

  // Function to handle a request to show movie details
  triggerDetailsUpdate (movieID) {
    // Change the state so it will re-render the Modal
    this.setState({
      movieID: movieID
    })
  }
}

// Expose this component for import in other files
export default MovieBrowser
