import React from 'react'
import styled from '@emotion/styled'

const Count = styled('div')`
  position: absolute;
  right: 7%;
  bottom: 13%;

  font-size: 112px;
  color: #fff;
  font-family: 'Share Tech Mono';
  .wrap-count {
    position: relative;
    overflow: hidden;
    padding-right: 56px;
    .item {
      position: absolute;
      right: 0;
      top: 100px;
      &.current {
        top: 0;
      }
    }
  }
`

const ProjectCounter = () => {
  return (
    <Count>
      <div className="wrap-count">
        <span className="zero">0</span>
        <span className="item current project-soccer">1</span>
        <span className="item project-redd">2</span>
        <span className="item project-perrin">3</span>
      </div>
    </Count>
  )
}

export default ProjectCounter