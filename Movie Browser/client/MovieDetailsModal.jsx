// jQuery is defined but eslint doesn't know about it
// so we declare it as a global so it won't complain
/* global $ */

// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

class MovieDetailsModal extends React.Component {
  constructor (props) {
    super(props)

    // Initialize component state to empty
    this.state = {}
    this.modalID = `detailsModal-${this.props.id}`
  }

  // Run code after this is added to the DOM
  componentDidMount () {
    this.fetchMovieDetails(this.props.id)
  }

  // Run code when then parent sends new props
  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.fetchMovieDetails(nextProps.id)
      this.modalID = `detailsModal-${nextProps.id}`
    } else {
      $(`#${this.modalID}`).modal()
    }
  }

  // Runs whenever the component is updated (aka, rendered)
  componentDidUpdate () {
    // If the movie is ready, show the modal
    if (this.state.movie) {
      // Show the modal
      $(`#${this.modalID}`).modal()
    }
  }

  // Use to re-fresh/fetch the movie details
  fetchMovieDetails (id) {
    // Query the all-movies API
    fetch('/api/movie/' + id).then((res) => {
      // Examine response status
      if (res.status !== 200) {
        console.log('error retrieveing movie details')
      } else {
        // Decode the JSON and update the state
        res.json().then((data) => {
          this.setState({
            movie: data
          })
        })
      }
    })
  }

  render () {
    // Do we have movie data?
    if (this.state.movie) {
      // Render a bootstrap modal with the movie details
      return (
        <div className="modal fade" id={this.modalID}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">{this.state.movie.name}</h4>
              </div>
              <div className="modal-body">
                <ul>
                  <li>image = {this.state.movie.image}</li>
                  <li>genres = {this.state.movie.genres}</li>
                  <li>year = {this.state.movie.year}</li>
                  <li>rated = {this.state.movie.rated}</li>
                  <li>IMDBRating = {this.state.movie.imdbrating}</li>
                  <li>description = {this.state.movie.description}</li>
                  <li>actors = {this.state.movie.actors}</li>
                  <li>directors = {this.state.movie.directors}</li>
                  <li>writers = {this.state.movie.writers}</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

// Property type checking
MovieDetailsModal.propTypes = {
  id: PropTypes.string.isRequired
}

// Expose this component for import in other files
export default MovieDetailsModal
