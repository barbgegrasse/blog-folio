import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'
import styled from '@emotion/styled'
import colors from '../../styles/colors'

const HnTitle = styled('span')`
  display: block;
  margin: 3rem 0 1.5rem;
  font-size: 3rem;
  font-weight: 200;
  font-style: italic;
  color: ${colors.yellow500};
`

export default ({ slice }) => {
  const type = slice.fields[0].hn[0].type
  const text = slice.fields[0].hn[0].text

  const res = (() => {
    switch (type) {
      case 'heading2':
        return (
          <h2>
            <HnTitle>{text}</HnTitle>
          </h2>
        )
      case 'heading3':
        return <h3>{text}</h3>
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
