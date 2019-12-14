import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { TimelineLite, Power4 } from 'gsap'
import styled from '@emotion/styled'
import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'
import fonts from '../../styles/fonts'

const BlocPresentation = styled('div')`
  z-index: 200;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  overflow: hidden;

  &.current {
    z-index: 300;
  }

  @media (max-width: ${dimensions.maxwidthHorizonTab}px) {
    background: #fff;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    top: initial;
    bottom: 10px;
    transform: translate(-100%, 0);
    background: none;
    left: 10px;
    mix-blend-mode: multiply;
  }
`
const BackgroundImageWrap = styled('div')`
  overflow: hidden;
  position: absolute;
  z-index: 100;
  right: 10%;
  top: 50%;

  width: 1020px;
  transform: translateY(-50%);

  &.current {
    z-index: 150;
  }

  @media (max-width: ${dimensions.maxwidthMacBook}px) {
    top: 120px;
    transform: translateY(0);
    width: 600px;
    max-width: 100%;
    right: 0;
  }
`

const BackgroundImage = styled('div')`
  position: relative;
  width: 100%;
  height: 720px;
  background-size: cover;
  margin-left: 100%;

  @media (max-width: ${dimensions.maxwidthMacBook}px) {
    height: 537px;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    height: 275px;
  }
`

const TitleProject = styled('h2')`
  margin-bottom: 120px;
  font-family: 'IBM Plex Mono', monospace;
  color: #ce265d;
  font-size: 80px;
  font-weight: 200;
  line-height: 1;
  font-style: italic;
  transform: translate(-101%, 0);

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    font-size: 55px;
    margin-bottom: 15px;
  }
`

const DescProject = styled('p')`
  display: block;
  color: #0f0350;
  font-size: 24px;
  max-width: 450px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    font-size: 16px;
  }
`

const Technos = styled('span')`
  display: block;
  font-size: 27px;
  color: #0f0350;
  margin-top: 40px;
  font-family: 'Share Tech Mono';

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    display: none;
  }
`

const LinkProject = styled('a')`
  display: inline-block;
  transform: translate(-100%, 0);
  padding: 10px 15px;
  margin-top: 40px;

  font-family: ${fonts.Share};
  color: #fff;
  font-weight: 200;
  font-size: 18px;
  text-decoration: none;

  background: ${colors.blue900};
  transition: background-color 0.3s linear;
`

class ProjectCard extends Component {
  static handleOut(event) {
    const el = event.target
    el.style.backgroundColor = colors.blue900
  }

  constructor(props) {
    super(props)
    this.handleHoverLink = this.handleHoverLink.bind(this)
    this.handleHoverImage = this.handleHoverImage.bind(this)
    this.handleOutImage = this.handleOutImage.bind(this)
  }

  handleHoverLink(event) {
    const el = event.target
    el.style.backgroundColor = this.props.color
  }

  handleHoverImage() {
    // Animation du background
    const animBgIn = new TimelineLite()
    animBgIn.to('#fullpage', 0.5, {
      backgroundImage: `-webkit-linear-gradient(180deg, ${this.props.color} 50%, #ffffff 34%)`,
      ease: Power4.easeInOut,
    })
    animBgIn.play()
  }

  handleOutImage() {
    // Animation du background
    const animBgOut = new TimelineLite()
    animBgOut.to('#fullpage', 0.5, {
      backgroundImage: `-webkit-linear-gradient(180deg, ${this.props.color} 34%, #ffffff 34%)`,
      ease: Power4.easeInOut,
    })
    animBgOut.play()
  }

  render() {
    const {
      project: {
        slug,
        name,
        desc,
        technos,
        color,
        siteweb,
        current,
        image,
        id,
        mainColor,
      },
    } = this.props
    return (
      <>
        <BlocPresentation
          className={`bloc-presentation ${slug} project-${slug} ${current} `}
        >
          <TitleProject className="title-project" css={{ color }}>
            {name}
          </TitleProject>

          <DescProject className="desc-project">{desc}</DescProject>

          <Technos className="technos">{technos}</Technos>

          <LinkProject
            className="link-project"
            href={siteweb}
            onMouseOver={this.handleHoverLink}
            onFocus={this.handleHoverLink}
            onMouseOut={ProjectCard.handleOut}
            onBlur={ProjectCard.handleOut}
          >
            Découvrir le projet en ligne
          </LinkProject>
        </BlocPresentation>

        <BackgroundImageWrap
          onMouseOver={this.handleHoverImage}
          onFocus={this.handleHoverImage}
          onMouseOut={this.handleOutImage}
          onBlur={this.handleOutImageImage}
          className={`illu-project-wrapper project-${slug} ${current}`}
        >
          <BackgroundImage
            className={`background-image ${current} project-${slug}`}
            css={{ backgroundImage: `url(${image})` }}
          />
        </BackgroundImageWrap>
      </>
    )
  }
}

export default connect(
  state => ({
    currentProject: state.app.currentProject,
    mainColor: state.app.mainColor,
  }),
  null
)(ProjectCard)

ProjectCard.propTypes = {
  mainColor: PropTypes.element.isRequired,
  project: PropTypes.element.isRequired,
}
