import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const BlockSpan = styled('div')`
  margin: 40px 0 40px;
  transform: translateX(-100%);
  .item {
    display: block;
    width: 88px;
    height: 4px;
    border-radius: 5px;
    background-color: #ce265d;
    &:first-child {
      margin-bottom: 14px;
    }
    &:last-child {
      margin-left: 54px;
    }
  }
`

const SectionPresentation = () => {
  return (
    <div className="section section1" data-anchor="presentation">
      <div id="blockPresentation" className="block-presentation">
        <h1 id="mainTitle" className="main-title">
          <span className="item">Johan</span>
          <span className="item">Petri</span>
          <span className="item">Kovsky</span>
        </h1>

        <BlockSpan id="blockSpan">
          <span className="item" />
          <span className="item" />
        </BlockSpan>
        <div className="relative wrap-fonction">
          <h2 id="fonction" className="fonction">
            Front-end web developer
          </h2>
          <p id="fonction" className="fonction smaller">
            & Overwatch Master
          </p>
        </div>
      </div>

      <div id="blockMoon" className="block-moon">
        <div className="half" />
        <div className="wrap">
          <div id="wrapLogo" className="wrap-logo">
            <div id="moon" className="moon" />
          </div>
          <div id="wrapMoon" className="wrap-moon">
            <div id="mainLogo" className="main-logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionPresentation
