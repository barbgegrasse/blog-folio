import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import colors from '../../styles/colors'

const HnTitle = styled('span')`
  max-width: 1000px;
  display: block;
  padding: 0 10px;
  margin: 3rem auto 1.5rem;
  font-size: 3rem;
  font-weight: 200;
  font-style: italic;
  color: ${colors.yellow500};
`

export default function Hn({ slice }) {
  const { type, text } = slice.fields[0].hn[0]
  const res = (() => {
    switch (type) {
      case 'heading2':
        return (
          <h2>
            <HnTitle>{text}</HnTitle>
          </h2>
        )
      case 'heading3':
        return (
          <h3>
            <HnTitle>{text}</HnTitle>
          </h3>
        )
      case 'heading4':
        return <h4>{text}</h4>
      case 'heading5':
        return <h5>{text}</h5>
      case 'heading6':
        return <h6>{text}</h6>
      default:
        return false
    }
  })()

  return <>{res}</>
}

Hn.propTypes = {
  slice: PropTypes.element.isRequired,
}
