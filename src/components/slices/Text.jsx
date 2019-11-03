import React from 'react'
import { linkResolver } from '../../utils/linkResolver'
import { RichText } from 'prismic-reactjs'

export default ({ slice }) => {
  return (
    <div className="post-slice">
      // RichText.render(slice.primary.rich_text, linkResolver)
      {RichText.render(slice.primary.rich_text, linkResolver)}
    </div>
  )
}
