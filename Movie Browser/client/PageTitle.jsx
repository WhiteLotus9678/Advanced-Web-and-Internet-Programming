// Bring in the react library
import React from 'react'
import PropTypes from 'prop-types'

// A component that displays a bootstrap page-header
// With a given title and optional subtitle
class PageTitle extends React.Component {
  render () {
    if (this.props.subtitle) {
      // If a sub-title was provided
      return (
        <h1 className="page-header">
          {this.props.title}&nbsp;
          <small>{this.props.subtitle}</small>
        </h1>
      )
    } else {
      // No-subtitle
      return (<h1 className="page-header">{this.props.title}</h1>)
    }
  }
}

// Property type checking
PageTitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string
}

// Expose this component for import in other files
export default PageTitle
