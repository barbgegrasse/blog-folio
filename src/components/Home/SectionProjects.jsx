import React from 'react'
import PropTypes from 'prop-types'

const SectionProjects = ({ children }) => {
  return (
    <div data-anchor="portfolio" className="projects section section2">
      {children}
    </div>
  )
}

export default SectionProjects

SectionProjects.propTypes = {
  children: PropTypes.element.isRequired,
}
