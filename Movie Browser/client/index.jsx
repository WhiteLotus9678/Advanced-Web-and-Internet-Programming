// Bring in React
import React from 'react'
import ReactDOM from 'react-dom'

// Bring in our custom components
import PageTitle from './PageTitle.jsx'
import MovieBrowser from './MovieBrowser.jsx'

// Render a root bootstrap 'container' div, a PageTitle component and a MovieBrowser component
ReactDOM.render(
  <div className="container">
    <PageTitle title="Movie Browser" subtitle="Click on a movie to view its details" />
    <MovieBrowser />
  </div>,

  // Render to the element with the ID root
  document.getElementById('root')
)
