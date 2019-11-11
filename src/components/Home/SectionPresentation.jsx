import React from 'react'
import styled from '@emotion/styled'
import colors from '../../styles/colors'

const BlockPresentation = styled('div')`
  position: absolute;
  color: #fff;
  position: absolute;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 11%;
`

const Fonction = styled('h2')`
  font-size: 60px;
  text-transform: uppercase;
  letter-spacing: -3px;
  mix-blend-mode: difference;
  color: ${colors.blue900};
  transform: translateX(-100%);
  margin-top: 30px;

  &.smaller {
    font-size: 22px;
    letter-spacing: -1px;
  }
`

const SectionPresentation = () => {
  return (
    <div className="section section1" data-anchor="presentation">
      <BlockPresentation>
        <h1 id="mainTitle" className="main-title">
          <span className="item">Johan</span>
          <span className="item">Petrikovsky</span>
        </h1>

        <div className="relative wrap-fonction">
          <Fonction id="fonction">
            Creative front-end
            <br />
            web developer
          </Fonction>
          <Fonction id="fonctionSmaller" className="smaller">
            Freelance depuis 2012.
            <br />
            +50 projets menés à bien.
          </Fonction>
        </div>
      </BlockPresentation>

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
