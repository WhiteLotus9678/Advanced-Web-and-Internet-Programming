// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

class GameSummary extends React.Component {
  render () {
    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <div className="gameSummary">
          <a className="gameButton" onClick={
            (event) => {
              event.preventDefault()
              this.props.triggerDetails(this.props.id)
            }
          }>
            <span className="summaryTitle">
              {this.props.name}
            </span>
          </a><br/>
          <span className="summaryInfo">
            {this.props.year}<br/>{this.props.minPlayers}-{this.props.maxPlayers} players
          </span>
        </div>
      </div>
    )
  }
}

// Property type checking
GameSummary.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  year: PropTypes.number,
  minPlayers: PropTypes.number,
  maxPlayers: PropTypes.number
}

// Expose this component for import in other files
export default GameSummary
