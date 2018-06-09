// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

// Display a bootstrap enabled summary of a movie
// The movie's details should be provided as props
class MovieSummary extends React.Component {
  render () {
    // Render the movie deetails for use in the MovieGrid
    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <div className="movieSummary">
          {/* Set a custom onClick function for the 'a' tag */}
          <a className="movieButton" href="#" onClick={
            (event) => {
              event.preventDefault()
              this.props.triggerDetails(this.props.id)
            }
          }>
            <span className="summaryTitle">{this.props.name}</span>
            <img alt={this.props.name} src={`images/thumbs/${this.props.image}`}/>
          </a><br/>
          <span className="summaryInfo">
            {this.props.genres}<br/>{this.props.year}, {this.props.rated}
          </span>
        </div>
      </div>
    )
  }
}

// Property type checking
MovieSummary.propTypes = {
  triggerDetails: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  genres: PropTypes.string,
  year: PropTypes.number,
  rated: PropTypes.string
}

// Expose this component for import in other files
export default MovieSummary
