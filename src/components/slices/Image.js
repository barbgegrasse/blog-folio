import React from 'react'

export default ({slice}) => {
    return(
        <div className="post-slice">
            <img src={slice.primary.image.url} alt="" title="" />
        </div>
    )
}