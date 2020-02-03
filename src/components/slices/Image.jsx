import React from 'react'
import PropTypes from 'prop-types'

export default function Image({ slice }) {
  return (
    <div className="post-slice">
      <img src={slice.primary.image.url} alt="" title="" />
    </div>
  )
}

Image.propTypes = {
  slice: PropTypes.element.isRequired,
}
