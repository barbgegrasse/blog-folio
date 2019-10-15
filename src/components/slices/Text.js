import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

export default ({slice}) => {
    return(
        <div className="post-slice">
            { RichText.render(slice.primary.rich_text, linkResolver) }
        </div>
    )
}