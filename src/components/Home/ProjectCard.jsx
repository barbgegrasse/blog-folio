import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import dimensions from '../../styles/dimensions'

const BlocPresentation = styled('div')`
  z-index: 200;
  position: absolute;
  top: 50%;
  left: 11%;
  transform: translate(0, -50%);
  overflow: hidden;
  &.project1 {
    z-index: 300;
  }
`
const BackgroundImageWrap = styled('div')`
  overflow: hidden;
  position: absolute;
  right: 10%;
  top: 50%;

  width: 1020px;
  transform: translateY(-50%);

  @media (max-width: ${dimensions.maxwidthMacBook}px) {
    width: 600px;
  }
`

const BackgroundImage = styled('div')`
  position: relative;
  width: 100%;
  height: 720px;
  background-size: cover;
  margin-left: 100%;
  &.current {
    margin-left: 0;
  }

  @media (max-width: ${dimensions.maxwidthMacBook}px) {
    height: 537px;
  }
`

const TitleProject = styled('h2')`
  margin-bottom: 100px;
  font-family: 'IBM Plex Mono', monospace;
  color: #ce265d;
  font-size: 80px;
  font-weight: 200;
  line-height: 1;
  font-style: italic;
  transform: translate(-101%, 0);
`

const DescProject = styled('p')`
  display: block;
  color: #0f0350;
  font-size: 24px;
  max-width: 450px;
`

const Technos = styled('span')`
  display: block;
  font-size: 30px;
  color: #0f0350;
  margin-top: 40px;
  font-family: 'Share Tech Mono';
`

const LinkProject = styled('a')`
  display: block;
  transform: translate(-101%, 0);
  padding: 15px 20px;
  max-width: 390px;
  margin-top: 40px;
  border-radius: 25px;

  background: #ce265d;
  color: #fff;

  font-weight: 800;
  font-size: 23px;
  text-decoration: none;
`

class ProjectCard extends Component {
  componentDidMount() {
    // empty
  }

  render() {
    const {
      project: { slug, name, color, siteweb, current, image, id, mainColor },
    } = this.props
    return (
      <>
        <BlocPresentation
          className={`bloc-presentation ${slug} project-${slug} ${current} `}
        >
          <TitleProject className="title-project" css={{ color }}>
            {name}
          </TitleProject>

          <DescProject className="desc-project">
            Développement et intégration de la partie front-end
            {slug}
          </DescProject>

          <Technos className="technos">HTML/JS/CSS/SASS/PHP</Technos>

          <LinkProject
            className="link-project"
            css={{ background: color }}
            href={siteweb}
          >
            Découvrir le projet en ligne
          </LinkProject>
        </BlocPresentation>

        <BackgroundImageWrap className={`illu-project-wrapper project-${slug}`}>
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
  // currentProject: PropTypes.element.isRequired,
  // totalProjects: PropTypes.element.isRequired,
  // dispatch: PropTypes.element.isRequired,
}
