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
    z-index: 250;
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

const ProjectCounter = props => {
  const projects = props.project
  return (
    <Count>
      <div className="wrap-count">
        <span className="zero">0</span>
        <span className="item current project-soccer">1</span>
        <span className="item project-redd">2</span>
        <span className="item project-perrin">3</span>
        <span className="item project-bng">4</span>
        <span className="item project-brito">5</span>
        <span className="item project-thalasso">6</span>
      </div>
    </Count>
  )
}

export default ProjectCounter
