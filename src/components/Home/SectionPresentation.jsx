import React from 'react'
import styled from '@emotion/styled'
import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'
import logo4 from '../../images/logo4.svg'

const BlockPresentation = styled('div')`
  position: absolute;
  color: #fff;
  position: absolute;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 11%;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    top: 10%;
    transform: translateY(0);
  }
`
const BlockMoon = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 29.427%;
  margin: auto;
  height: 1385px;
  width: 1385px;
  max-height: 100%;
  max-width: 100%;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    top: initial;
    left: 0;
    bottom: 0;
    height: 279px;
  }

  .wrap {
    position: relative;
    width: 100%;
    height: 100%;

    .wrap-logo {
      z-index: 200;

      position: absolute;
      top: 50%;
      left: 120%;
      transform: translate(-50%, -50%);

      mix-blend-mode: exclusion;

      @media (max-width: ${dimensions.maxwidthMobile}px) {
        top: 0;
        bottom: 0;
        transform: translate(-50%, 0%);
      }
    }

    .wrap-moon {
      z-index: 200;

      position: absolute;
      top: 50%;
      left: 120%;
      transform: translate(-50%, -50%);
    }

    .moon {
      background-color: #f3ffb3;
      clip-path: circle(50%);
      width: 545px;
      height: 545px;

      @media (max-width: ${dimensions.maxwidthHorizonTab}px) {
        width: 450px;
        height: 450px;
      }

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        width: 279px;
        height: 279px;
      }
    }

    .main-logo {
      display: block;
      width: 438px;
      height: 331px;

      background-image: url(${logo4});
      background-size: cover;

      @media (max-width: ${dimensions.maxwidthHorizonTab}px) {
        width: 325px;
        height: 246px;
      }

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        width: 230px;
        height: 173px;
      }
    }
  }
`

const MainTitle = styled('h1')`
  transform: translateX(-100%);
  font-family: 'IBM Plex Mono', monospace;
  color: #0f0350;
  font-size: 90px;
  font-weight: 200;
  line-height: 1;

  @media (max-width: ${dimensions.maxwidthHorizonTab}px) {
    font-size: 70px;
  }

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    font-size: 60px;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    font-size: 45px;
  }

  .item {
    display: block;
  }
`

const Fonction = styled('h2')`
  font-size: 60px;
  text-transform: uppercase;
  letter-spacing: -3px;
  mix-blend-mode: difference;
  color: ${colors.blue900};
  transform: translateX(-100%);
  margin-top: 30px;

  @media (max-width: ${dimensions.maxwidthHorizonTab}px) {
    font-size: 45px;
  }

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    font-size: 35px;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    font-size: 30px;
  }

  &.smaller {
    font-size: 22px;
    letter-spacing: -1px;
  }
`

const SectionPresentation = () => {
  return (
    <div className="section section1" data-anchor="presentation">
      <BlockPresentation>
        <MainTitle id="mainTitle" className="main-title">
          <span className="item">Johan</span>
          <span className="item">Petrikovsky</span>
        </MainTitle>

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

      <BlockMoon id="blockMoon">
        <div className="half" />
        <div className="wrap">
          <div id="wrapLogo" className="wrap-logo">
            <div id="moon" className="moon" />
          </div>
          <div id="wrapMoon" className="wrap-moon">
            <div id="mainLogo" className="main-logo" />
          </div>
        </div>
      </BlockMoon>
    </div>
  )
}

export default SectionPresentation
