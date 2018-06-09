// Bring in the react library
import React from 'react'

import GameGrid from './GameGrid.jsx'
import GameDetailsModal from './GameDetailsModal.jsx'

// The larger game browser that contains both a grid and the modal details
class GameBrowser extends React.Component {
  constructor (props) {
    super(props)

    // Bind the triggerDetailsUpdate funciton to always
    // have the current object as its 'this' param
    this.triggerDetailsUpdate = this.triggerDetailsUpdate.bind(this)

    // Initialize to an empty state
    this.state = {}
  }

  render () {
    if (this.state.gameID) {
      // If the gameID is defined then render the modal too
      return (
        <div>
          <GameGrid triggerDetails={this.triggerDetailsUpdate} />
          <GameDetailsModal id={this.state.gameID} />
        </div>
      )
    } else {
      // Render only the grid
      return (
        <div>
          <GameGrid triggerDetails={this.triggerDetailsUpdate} />
        </div>
      )
    }
  }

  // Function to handle a request to show game details
  triggerDetailsUpdate (gameID) {
    // Change the state so it will re-render the Modal
    this.setState({
      gameID: gameID
    })
  }
}

// Expose this component for import in other files
export default GameBrowser
