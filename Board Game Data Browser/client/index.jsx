// Bring in React
import React from 'react'
import ReactDOM from 'react-dom'

// Bring in our custom components
import PageTitle from './PageTitle.jsx'
import GameBrowser from './GameBrowser.jsx'

// Render a root bootstrap 'container' div and a PageTitle component
ReactDOM.render(
  <div className="container">
    <PageTitle title="Game Browser" subtitle="Browse through 100 board games from www.boardgamegeek.com!" />
    <GameBrowser />
  </div>,

  // Render to the element with the ID root
  document.getElementById('root')
)
