import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

export default ({ slice }) => {
  const type = slice.fields[0].hn[0].type
  const text = slice.fields[0].hn[0].text

  const res = (() => {
    switch (type) {
      case 'heading2':
        return <h2 className="hn-title">{text}</h2>
      case 'heading3':
        return <h3 className="hn-title">{text}</h3>
      case 'heading4':
        return <h4 className="hn-title">{text}</h4>
      case 'heading5':
        return <h5 className="hn-title">{text}</h5>
      case 'heading6':
        return <h6 className="hn-title">{text}</h6>
      default:
        return false
    }
  })()

  return <>{res}</>
}
