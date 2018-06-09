// jQuery is defined but eslint doesn't know about it
// so we declare it as a global so it won't complain
/* global $ */

// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

class GameDetailsModal extends React.Component {
  constructor (props) {
    super(props)

    // Initialize component state to empty
    this.state = {}
    this.modalID = `detailsModal-${this.props.id}`
  }

  // Run code after this is added to the DOM
  componentDidMount () {
    this.fetchGameDetails(this.props.id)
  }

  // Run code when then parent sends new props
  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.fetchGameDetails(nextProps.id)
      this.modalID = `detailsModal-${nextProps.id}`
    } else {
      $(`#${this.modalID}`).modal()
    }
  }

  // Runs whenever the component is updated (aka, rendered)
  componentDidUpdate () {
    // If the game is ready, show the modal
    if (this.state.game) {
      // Show the modal
      $(`#${this.modalID}`).modal()
    }
  }

  // Use to re-fresh/fetch the game details
  fetchGameDetails (id) {
    // Query the all-games API
    fetch('/api/game/' + id).then((res) => {
      // Examine response status
      if (res.status !== 200) {
        console.log('error retrieveing game details')
      } else {
        // Decode the JSON and update the state
        res.json().then((data) => {
          this.setState({
            game: data
          })
        })
      }
    })
  }

  render () {
    // Do we have game data?
    if (this.state.game) {
      // Render a bootstrap modal with the game details
      return (
        <div className="modal fade" id={this.modalID}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">{this.state.game.name}</h4>
              </div>
              <div className="modal-body">
                <ul>
                  <li>id = {this.state.game.id}</li>
                  <li>thumbnail = {this.state.game.thumbnail}</li>
                  <li>image = {this.state.game.image}</li>
                  <li>year = {this.state.game.year}</li>
                  <li>minPlayers = {this.state.game.minPlayers}</li>
                  <li>maxPlayers = {this.state.game.maxPlayers}</li>
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
GameDetailsModal.propTypes = {
  id: PropTypes.string.isRequired
}

// Expose this component for import in other files
export default GameDetailsModal
