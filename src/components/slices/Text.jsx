import React from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import styled from '@emotion/styled'
import { linkResolver } from '../../utils/linkResolver'

const PostSlice = styled('div')`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
`

export default function Text({ slice }) {
  return (
    <PostSlice>
      {RichText.render(slice.primary.rich_text, linkResolver)}
    </PostSlice>
  )
}

Text.propTypes = {
  slice: PropTypes.element.isRequired,
}
