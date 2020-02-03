import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const PostSlice = styled('div')`
  text-align: center;
  padding: 2rem 0;
`

export default function Image({ slice }) {
  return (
    <PostSlice>
      <img src={slice.primary.image.url} alt="" title="" />
    </PostSlice>
  )
}

Image.propTypes = {
  slice: PropTypes.element.isRequired,
}
