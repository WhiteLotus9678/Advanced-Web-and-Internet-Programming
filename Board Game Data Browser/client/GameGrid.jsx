// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

import GameSummary from './GameSummary.jsx'

class GameGrid extends React.Component {
  constructor (props) {
    super(props)

    // Initialize component state
    this.state = {
      ready: false
    }
  }

  componentDidMount () {
    fetch('/api/allGames').then((res) => {
      if (res.status !== 200) {
        console.log('error retrieveing games')
      } else {
        res.json().then((data) => {
          this.setState({
            games: data,
            ready: true
          })
        })
      }
    })
  }

  render () {
    if (this.state.ready) {
      console.log(this.state.games)

      // Build array of GameSummary elements
      let summaries = []
      this.state.games.forEach((game) => {
        summaries.push(
          <GameSummary {...game}
            key={game.id}
            triggerDetails={this.props.triggerDetails}/>
        )
      })

      return (
        <div className="row">
          {summaries}
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col-lg-12">
            <p>Retrieving games</p>
          </div>
        </div>
      )
    }
  }
}

// Property type checking
GameGrid.propTypes = {
}

// Expose this component for import in other files
export default GameGrid
