/* eslint-disable react/destructuring-assignment */
import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'
import { TimelineLite, Power1, Power2, Power4 } from 'gsap'
import styled from '@emotion/styled'
import LayoutIndex from '../components/LayoutIndex'
import dimensions from '../styles/dimensions'

import { setColor } from '../state/app'
// import { incrementProject, decrementProject } from '../state/app'

import '../styles/css/stylesheet.css'

import SectionPresentation from '../components/Home/SectionPresentation'
import SectionProjects from '../components/Home/SectionProjects'
import SectionContact from '../components/Home/SectionContact'
import ProjectCard from '../components/Home/ProjectCard'
import ProjectCounter from '../components/Home/ProjectCounter'

const anchors = ['presentation', 'portfolio', 'contact']
const animateAnchor = false

const BlockSpan = styled('div')`
  z-index: 800;
  position: absolute;
  top: 395px;
  @media (max-width: ${dimensions.maxwidthMacBook}px) {
    top: 355px;
  }
  left: 11%;
  .item {
    display: block;
    width: 88px;
    height: 4px;
    border-radius: 5px;
    background-color: #ce265d;
    &:first-child {
      margin-bottom: 15px;
    }
    &:last-child {
      margin-left: 54px;
    }
  }
`

class FullpageWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.clickNext = this.clickNext.bind(this)
    this.clickPrev = this.clickPrev.bind(this)

    this.animProjects = new TimelineLite({ paused: true })

    this.currentProject = 0
    this.nextProject = this.currentProject + 1
    this.totalProjects = 3

    this.dispatch = this.props.dispatch

    this.state = {
      currentProject: 0, // indice de mon projet
      projectList: [
        {
          id: 1,
          name: 'Soccerpark',
          color: '#d41e38',
          slug: 'soccer',
          siteweb: 'http://lefive.fr',
          current: 'current',
          image: this.props.data.soccerpark.childImageSharp.fluid.src,
        },
        {
          id: 2,
          name: 'Redd',
          slug: 'redd',
          color: '#003057',
          siteweb: 'http://lefive.fr',
          current: '',
          image: this.props.data.thalasso.childImageSharp.fluid.src,
        },
        {
          id: 3,
          name: 'Perrin Ravioli',
          slug: 'perrin',
          color: '#afac05',
          siteweb: 'http://lefive.fr',
          current: '',
          image: this.props.data.thalasso.childImageSharp.fluid.src,
        },
      ],
      animProject: true,
    }
  }

  componentDidMount() {
    new TimelineLite()

      // Animation des rideaux
      .from('#fullpage', 0, {
        backgroundImage:
          '-webkit-linear-gradient(90deg, #0f0350 100%, #ffffff 34%)',
        ease: Power1.easeInOut,
      })
      .to('#fullpage', 1, {
        backgroundImage:
          '-webkit-linear-gradient(112deg, #0f0350 65%, #ffffff 50%)',
        ease: Power1.easeInOut,
      })
      // .to('#fullpage', 1, {backgroundImage:"-webkit-linear-gradient(112deg, rgb(206, 38, 93) 34%, #0f0350 34%)", ease: Power1.easeInOut},'-=0.4')
      // Animation des éléments de présentation
      .addLabel('ouverture')
      .to(
        '#mainTitle',
        1,
        { marginLeft: 0, ease: Power1.easeInOut },
        'ouverture'
      )
      .to(
        '#blockSpan',
        0.5,
        { xPercent: 100, ease: Power2.easeInOut },
        'ouverture'
      )
      .to(
        '#fonction',
        0.5,
        { xPercent: 100, ease: Power2.easeInOut },
        'ouverture'
      )

      // Animation de la boule et du logo
      .to(
        '#wrapMoon',
        0.9,
        { left: '50%', ease: Power1.easeInOut },
        'ouverture'
      )
      .to('#wrapLogo', 1, { left: '50%', ease: Power1.easeInOut }, 'ouverture')
      .addLabel('firstSlideOver')
  }

  activeMenu(colorItem) {
    console.log('color item', colorItem)
    const activeItem = document.querySelector('#mainmenu a:nth-child(2)')
    activeItem.style.color = colorItem
  }

  clickPrev() {
    const projects = this.state.projectList
    // eslint-disable-next-line prefer-destructuring
    const currentProject = this.state.currentProject
    const prevProject = currentProject - 1
    // retourne  faux si pas de projet précédent
    if (prevProject < 0) {
      return false
    }
    const currentProjectSlug = projects[currentProject].slug
    const prevProjectSlug = projects[prevProject].slug
    const { color } = projects[prevProject]
    const ggGoPrev = new TimelineLite()

    ggGoPrev
      // On réduit la taille des visuels
      .to('.illu-project-wrapper', 0.4, {
        scaleX: 0.8,
        scaleY: 0.8,
        ease: Power1.easeInOut,
      })

      // Déplacement du fond de la page
      .to(
        '#fullpage',
        0.5,
        {
          backgroundImage:
            '-webkit-linear-gradient(180deg, rgb(206, 38, 93) 50%, #ffffff 34%)',
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}`
      )

      // Décalage du visuel project en cours
      .to(
        `.background-image.project-${currentProjectSlug}`,
        0.5,
        {
          marginLeft: '100%',
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}`
      )

      // Déplacement du titre
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .title-project`,
        1,
        {
          xPercent: -100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement de la description
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .desc-project`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement suivant précédent
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .block-span`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement des technos
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .technos`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement du bouton projet en cours
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .link-project`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement du bouton projet en précédent
      .to(
        `.bloc-presentation.project-${prevProjectSlug} .link-project`,
        1,
        { xPercent: 100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Décalage visuel projet précédent
      .to(
        `.background-image.project-${prevProjectSlug}`,
        0.5,
        {
          marginLeft: 0,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}`
      )

      // Changement de couleur du fond
      .to(
        '#fullpage',
        0.5,
        {
          backgroundImage: `-webkit-linear-gradient(180deg, ${color} 34%, #ffffff 34%)`,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=0.5`
      )

      // Changement de couleur du bouton next/prev
      .to(
        '.block-span .item',
        0.5,
        {
          backgroundColor: `${color}`,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}-=0.5`
      )

      // Changement de couleur du state
      .call(
        // eslint-disable-next-line func-names
        function() {
          this.dispatch(setColor(color))
        },
        null,
        this,
        '-=2'
      )
      .call(
        // eslint-disable-next-line func-names
        function() {
          this.activeMenu(color)
        },
        null,
        this,
        '-=2'
      )

      // mise à jour du counter

      .to(
        `.wrap-count .item.project-${currentProjectSlug}`,
        1.2,
        { top: 100, ease: Power1.easeInOut },
        '-=0.8'
      )
      .to(
        `.wrap-count .item.project-${prevProjectSlug}`,
        0.5,
        { top: 0, ease: Power1.easeInOut },
        '-=0.8'
      )
      // Animation titre project suivant
      .to(
        `.bloc-presentation.project-${prevProjectSlug} .title-project`,
        0.5,
        {
          xPercent: 100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=1`
      )
      // Animation de la description
      .to(
        `.bloc-presentation.project-${prevProjectSlug} .desc-project`,
        0.5,
        {
          xPercent: 100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=1`
      )

      // Animation précédent suivant
      .to(
        `.bloc-presentation.project-${prevProjectSlug} .block-span`,
        1,
        { xPercent: 100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Animation technos projet suivant
      .to(
        `.bloc-presentation.project-${prevProjectSlug} .technos`,
        0.5,
        {
          xPercent: 100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=1`
      )

      // On augmente la taille des visuels
      .to(
        '.illu-project-wrapper',
        0.8,
        { scaleX: 1, scaleY: 1, ease: Power4.easeInOut },
        '-=0.4'
      )

    this.state.currentProject = prevProject

    // this.animProjects.reverse().
    ggGoPrev.play()
    return true
  }

  clickNext() {
    const projects = this.state.projectList
    // eslint-disable-next-line prefer-destructuring
    const currentProject = this.state.currentProject
    const nextProject = currentProject + 1

    if (nextProject === this.totalProjects) {
      return false
    }

    const currentProjectSlug = projects[currentProject].slug
    const nextProjectSlug = projects[nextProject].slug
    const { color } = projects[nextProject]
    const ggGoNext = new TimelineLite()

    console.log(currentProject, nextProject, this.totalProjects)

    ggGoNext
      // .addLabel(`debutanim${currentProject}`)
      // On réduit la taille des visuels
      .to('.illu-project-wrapper', 0.4, {
        scaleX: 0.8,
        scaleY: 0.8,
        ease: Power1.easeInOut,
      })

      // Déplacement du fond de la page
      .to(
        '#fullpage',
        0.5,
        {
          backgroundImage:
            '-webkit-linear-gradient(180deg, rgb(206, 38, 93) 50%, #ffffff 34%)',
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}`
      )

      // Décalage du visuel project en cours
      .to(
        `.background-image.project-${currentProjectSlug}`,
        0.5,
        {
          marginLeft: '-100%',
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}`
      )

      // Déplacement du titre
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .title-project`,
        1,
        {
          xPercent: -100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement de la description
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .desc-project`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement suivant précédent
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .block-span`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement des technos
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .technos`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement du bouton projet en cours
      .to(
        `.bloc-presentation.project-${currentProjectSlug} .link-project`,
        1,
        { xPercent: -100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Déplacement du bouton projet en cours
      .to(
        `.bloc-presentation.project-${nextProjectSlug} .link-project`,
        1,
        { xPercent: 100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Décalage visuel projet suivant
      .to(
        `.background-image.project-${nextProjectSlug}`,
        0.5,
        {
          marginLeft: 0,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}`
      )

      // Changement de couleur du fond
      .to(
        '#fullpage',
        0.5,
        {
          backgroundImage: `-webkit-linear-gradient(180deg, ${color} 34%, #ffffff 34%)`,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=0.5`
      )

      // Changement de couleur du bouton next/prev
      .to(
        '.block-span .item',
        0.5,
        {
          backgroundColor: `${color}`,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}-=0.5`
      )

      // Changement de couleur du state
      .call(
        // eslint-disable-next-line func-names
        function() {
          this.dispatch(setColor(color))
        },
        null,
        this,
        '-=2'
      )

      .call(
        // eslint-disable-next-line func-names
        function() {
          this.activeMenu(color)
        },
        null,
        this,
        'leaveOne'
      )

      // mise à jour du counter

      .to(
        `.wrap-count .item.project-${currentProjectSlug}`,
        1.2,
        { top: -100, ease: Power1.easeInOut },
        '-=0.8'
      )
      .to(
        `.wrap-count .item.project-${nextProjectSlug}`,
        0.5,
        { top: 0, ease: Power1.easeInOut },
        '-=0.8'
      )
      // Animation titre project suivant
      .to(
        `.bloc-presentation.project-${nextProjectSlug} .title-project`,
        0.5,
        {
          xPercent: 100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=1`
      )
      .to(
        `.bloc-presentation.project-${nextProjectSlug} .desc-project`,
        0.5,
        {
          xPercent: 100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=1`
      )

      // Animation précédent suivant
      .to(
        `.bloc-presentation.project-${nextProjectSlug} .block-span`,
        1,
        { xPercent: 100, ease: Power4.easeInOut },
        `moveBackground${currentProject}+=0.1`
      )

      // Animation technos projet suivant
      .to(
        `.bloc-presentation.project-${nextProjectSlug} .technos`,
        0.5,
        {
          xPercent: 100,
          ease: Power4.easeInOut,
        },
        `moveBackground${currentProject}+=1`
      )

      // On augmente la taille des visuels
      .to(
        '.illu-project-wrapper',
        0.8,
        { scaleX: 1, scaleY: 1, ease: Power4.easeInOut },
        '-=0.4'
      )
      .addLabel(`finanim${currentProject}`)

    this.state.currentProject = nextProject

    // this.animProjects.reverse().
    ggGoNext.play()
    return true
  }

  render() {
    const { currentProject, dispatch } = this.props
    const delay = 900 // milliseconds
    let timeoutId
    let animationIsFinished = false
    return (
      <LayoutIndex>
        <ReactFullpage
          anchors={anchors}
          lockAnchors={false}
          menu="mainmenu"
          animateAnchor={animateAnchor}
          scrollingSpeed={500}
          navigation
          navigationPosition="left"
          onLeave={(origin, destination, direction) => {
            if (origin.index === 0) {
              // On quitte le premier slide

              const activeItem = document.querySelector(
                '#mainmenu a:nth-child(2)'
              )
              activeItem.style.color = '#d41e38'

              new TimelineLite()
                .addLabel('leaveOne')
                // On fait bouger le logo
                .to('#wrapMoon', 0.5, {
                  left: '100%',
                  opacity: 0,
                  ease: Power4.easeInOut,
                })

                .to(
                  '#wrapLogo',
                  0.4,
                  { left: '100%', opacity: 0, ease: Power4.easeInOut },
                  'leaveOne'
                )

                .to(
                  '#mainTitle',
                  1,
                  { xPercent: -100, ease: Power1.easeInOut },
                  'leaveOne'
                )

                .to(
                  '#blockSpan',
                  0.5,
                  { xPercent: -100, ease: Power2.easeInOut },
                  'leaveOne'
                )

                .to(
                  '#fonction',
                  0.5,
                  { xPercent: -100, ease: Power2.easeInOut },
                  'leaveOne'
                )

                .to(
                  '#fullpage',
                  1,
                  {
                    backgroundImage:
                      '-webkit-linear-gradient(180deg, rgb(206, 38, 93) 34%, #ffffff 34%)',
                    ease: Power1.easeInOut,
                  },
                  'leaveOne'
                )
                // Changement de couleur du state

                .call(
                  // eslint-disable-next-line func-names
                  function() {
                    this.props.dispatch(
                      setColor(this.state.projectList[0].color)
                    )
                  },
                  null,
                  this,
                  'leaveOne+=2.5'
                )

              if (this.state.animProject) {
                new TimelineLite()
                  .to('.movetrait', 0.8, {
                    xPercent: 100,
                    ease: Power4.easeInOut,
                  })
                  .to(
                    `.${this.state.projectList[0].slug} .title-project`,
                    0.8,
                    { xPercent: 100, ease: Power4.easeInOut }
                  )
                  .to(
                    `.${this.state.projectList[0].slug} .block-span`,
                    0.5,
                    { xPercent: 100, ease: Power4.easeInOut },
                    '-=0.7'
                  )
                  .to(
                    `.${this.state.projectList[0].slug} .desc-project`,
                    0.8,
                    { xPercent: 100, ease: Power4.easeInOut },
                    '-=0.7'
                  )
                  .to(
                    `.${this.state.projectList[0].slug} .technos`,
                    0.8,
                    { xPercent: 100, ease: Power4.easeInOut },
                    '-=0.7'
                  )
                  .to(
                    '.illu-project-wrapper',
                    1,
                    { opacity: 1, ease: Power1.easeInOut },
                    '-=0.7'
                  )
                  .to(
                    `.${this.state.projectList[0].slug} .link-project`,
                    0.8,
                    { xPercent: 100, ease: Power4.easeInOut },
                    '-=0.7'
                  )

                this.setState({ animProject: false })
              }

              // animating my element
              clearTimeout(timeoutId)

              timeoutId = setTimeout(() => {
                animationIsFinished = true

                if (direction === 'down') {
                  this.fullPageApi.moveSectionDown()
                } else {
                  // this.fullPageApi.moveSectionUp()
                }
              }, delay)

              return animationIsFinished
            }

            // Si je retourne sur le premier slide
            if (destination.index === 0) {
              new TimelineLite()
                .to('#wrapMoon', 0.3, {
                  left: '50%',
                  opacity: 1,
                  ease: Power1.easeInOut,
                })
                .to(
                  '#wrapLogo',
                  0.5,
                  { left: '50%', opacity: 1, ease: Power1.easeInOut },
                  '-=0.5'
                )
                .to(
                  '#mainTitle',
                  1,
                  { xPercent: 0, ease: Power1.easeInOut },
                  'leaveOne'
                )

                .to(
                  '#blockSpan',
                  0.5,
                  { xPercent: 100, ease: Power2.easeInOut },
                  'leaveOne'
                )

                .to(
                  '#fonction',
                  0.5,
                  { xPercent: 100, ease: Power1.easeInOut },
                  'leaveOne'
                )

                // Retour background diagonale
                .to(
                  '#fullpage',
                  1,
                  {
                    backgroundImage:
                      'webkit-linear-gradient(112deg, rgb(15, 3, 80) 65%, rgb(255, 255, 255) 50%)',
                    ease: Power1.easeInOut,
                  },
                  'leaveOne'
                )
            }
          }}
          render={({ fullpageApi }) => {
            this.fullPageApi = fullpageApi
            // console.log(this.state.projectList)
            return (
              <>
                <div>
                  <SectionPresentation />
                  <SectionProjects>
                    <>
                      <BlockSpan>
                        <span
                          className="item"
                          aria-label="Précédent"
                          role="button"
                          tabIndex={0}
                          onClick={this.clickPrev}
                          onKeyUp={this.clickPrev}
                        />
                        <span
                          className="item"
                          aria-label="Suivant"
                          role="button"
                          tabIndex={0}
                          onClick={this.clickNext}
                          onKeyDown={this.clickNext}
                        />
                      </BlockSpan>
                      {this.state.projectList.map(project => {
                        return (
                          <ProjectCard
                            currentProject={this.state.currentProject}
                            key={project.id}
                            color={project.color}
                            project={project}
                            totalProjects={this.state.projectList.length}
                          />
                        )
                      })}

                      <ProjectCounter />
                    </>
                  </SectionProjects>
                </div>
              </>
            )
          }}
        />
      </LayoutIndex>
    )
  }
}

export const query = graphql`
  query {
    soccerpark: file(relativePath: { eq: "soccerpark.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1020) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    thalasso: file(relativePath: { eq: "thalasso.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1020) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    brito: file(relativePath: { eq: "brito.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1020) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default connect(
  state => ({
    currentProject: state.app.currentProject,
    mainColor: state.app.mainColor,
  }),
  null
)(FullpageWrapper)

ProjectCard.propTypes = {
  mainColor: PropTypes.element.isRequired,
  currentProject: PropTypes.element.isRequired,
  dispatch: PropTypes.element.isRequired,
}

/*
const fullpageOptions = {
    sectionsColor:["#282c34", "#ff5f45", "#0798ec"]

}

const logo = '</>'

const FullpageWrapper = fullpageProps => (
  <ReactFullpage
    {...fullpageOptions}
    onLeave={(origin, destination, direction) => {
        //console.log("onLeave event", { origin, destination, direction });
        if(origin.index == 0){
            console.log("je quitte le premier")
            const actionLeaveSection1 = new TimelineLite()
            .to("#blockPresentation", 1 ,{xPercent: -200, ease: Power1.easeInOut}) 
        }
    }}

    render={({ state, fullpageApi }) => {
        console.log('render prop change', state) // eslint-disable-line no-console


        if (state.callback === 'onLeave') {
            console.log("leave");
            if (state.direction === 'down') {
            console.log('going down...' + state.origin.index)
            }
        }

        const action = new TimelineLite()
        //Animation des rideaux
        .set('body', {className:"+=active"} ) 
        .to('#rideauLeft',2,{xPercent: -200 , ease: Power4.easeInOut}) 
        .to('#rideauRight',2,{xPercent: 200 , ease: Power4.easeInOut},'-=2') 

        //Animation des éléments de présentation
        .to('#mainTitle',1,{marginLeft:0, ease: Power1.easeInOut},'-=1') 
        .to('#blockSpan',0.5,{marginLeft:0, ease: Power2.easeInOut},'-=0.5') 
        .to('#fonction',0.5,{marginLeft:0, ease: Power2.easeInOut},'-=0.5') 

        action.play();

      return (
        <>
        <div id="rideauLeft" className="rideau left">

        </div>
        <div id="rideauRight" className="rideau right">
            
        </div>
        <div id="fullpage-wrapper">
          <div className="section section1">

            <div id="blockPresentation" className="block-presentation">
                <h1 id="mainTitle" className="main-title">
                    <span className="item">Johan</span>
                    <span className="item">Petri<span>kovsky</span></span>
                </h1>
                <div id="blockSpan" className="block-span">
                    <span className="item"></span>
                    <span className="item"></span>
                </div>
                <h2 id="fonction" className="fonction">Front-end web developer</h2>
            </div>
            <div className="losange-white"></div>
          </div>
          <div className="section">
            <div className="slide">
              <h3>Slide 2.1</h3>
            </div>
            <div className="slide">
              <h3>Slide 2.2</h3>
            </div>
            <div className="slide">
              <h3>Slide 2.3</h3>
            </div>
          </div>
          <div className="section">
            <h3>Section 3</h3>
          </div>
        </div>
        </>
      )
    }}
  />
)

export default FullpageWrapper
*/

/*
import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Button from "components/_ui/Button";
import About from "components/About";
import LayoutIndex from "components/LayoutIndex";
import ProjectCard from "components/ProjectCard";
import ReactFullpage from '@fullpage/react-fullpage';

const Hero = styled("div")`
    padding-top: 2.5em;
    padding-bottom: 3em;
    margin-bottom: 6em;
    max-width: 830px;

    @media(max-width:${dimensions.maxwidthMobile}px) {
       margin-bottom: 3em;
    }

    h1 {
        margin-bottom: 1em;

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;

            &:nth-of-type(1) { color: ${colors.blue500}; }
            &:nth-of-type(2) { color: ${colors.orange500}; }
            &:nth-of-type(3) { color: ${colors.purple500}; }
            &:nth-of-type(4) { color: ${colors.green500}; }
            &:nth-of-type(5) { color: ${colors.teal500}; }

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;

                &:nth-of-type(1) { color: ${colors.blue600};    background-color: ${colors.blue200};}
                &:nth-of-type(2) { color: ${colors.orange600};  background-color: ${colors.orange200};}
                &:nth-of-type(3) { color: ${colors.purple600};  background-color: ${colors.purple200};}
                &:nth-of-type(4) { color: ${colors.green600};   background-color: ${colors.green200};}
                &:nth-of-type(5) { color: ${colors.teal600};    background-color: ${colors.teal200};}

            }
        }
    }
`

const Section = styled("div")`
    margin-bottom: 10em;
    display: flex;
    flex-direction: column;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 4em;
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`

const WorkAction = styled(Link)`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;
    margin-left: auto;

    @media(max-width:${dimensions.maxwidthTablet}px) {
       margin: 0 auto;
    }

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }

    &:hover {
        color: ${colors.blue500};
        transition: all 150ms ease-in-out;

        span {
            transform: translateX(0px);
            opacity: 1;
            transition: transform 150ms ease-in-out;
        }
    }
`

const RenderBody = ({ home, projects, meta }) => (
    <>
        <Helmet
            title={meta.title}
            titleTemplate={`%s | ${meta.title}`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: meta.title,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Hero>
            <>
                {RichText.render(home.hero_title)}
            </>
            <a href={home.hero_button_link.url}
               target="_blank" rel="noopener noreferrer">
                <Button>
                    {RichText.render(home.hero_button_text)}
                </Button>
            </a>
        </Hero>
        <Section>
            {projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    category={project.node.project_category}
                    title={project.node.project_title}
                    description={project.node.project_preview_description}
                    thumbnail={project.node.project_preview_thumbnail}
                    uid={project.node._meta.uid}
                />
            ))}
            <WorkAction to={"/work"}>
                See more work <span>&#8594;</span>
            </WorkAction>
        </Section>
        <Section>
            {RichText.render(home.about_title)}
            <About
                bio={home.about_bio}
                socialLinks={home.about_links}
            />
        </Section>
    </>
);

export default ({ data }) => {
    //Required check for no data being returned
    const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
    const projects = data.prismic.allProjects.edges;
    const meta = data.site.siteMetadata;

    if (!doc || !projects) return null;
    
    return (
        <LayoutIndex>
            <RenderBody home={doc.node} projects={projects} meta={meta}/>
        </LayoutIndex>
    )
}

RenderBody.propTypes = {
    home: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    {
        prismic {
            allHomepages {
                edges {
                    node {
                        hero_title
                        hero_button_text
                        hero_button_link {
                            ... on PRISMIC__ExternalLink {
                                _linkType
                                url
                            }
                        }
                        content
                        about_title
                        about_bio
                        about_links {
                            about_link
                        }
                    }
                }
            }
            allProjects {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
*/

/*
    _onMouseMove(e) {
        //Je récupère ma lune
        const moon = document.querySelector("#moon").getBoundingClientRect();

        const moonLeft = moon.left //Je  récupềre son positionnement par rapport au bord gauche
        const moonCenterX = moon.width / 2 // Je vais additioner la largeur de lune / 2 pour avoir le centre
        const decalPosX = moonLeft + moonCenterX // décalage pour obtenir le centre de mon effet parralax

        //Même chose pour le Y
        const moonTop = moon.top //Je  récupềre son positionnement par rapport au bord gauche
        const moonCenterY = moon.height / 2 // Je vais additioner la largeur de lune / 2 pour avoir le centre
        const decalPosY = moonTop + moonCenterY // décalage pour obtenir le centre de mon effet parralax
        
        // déplacement du background  lune
        const moveXbgmoon =  ((e.screenX - decalPosX) / 100 ) //Je divise par 100 pour atténuer le mouvement
        const moveYbgmoon =  ((e.screenY - decalPosY) / 100 )

        //déplacement de la lune
        const moveXmoon =  ((e.screenX - decalPosX) / 40)
        const moveYmoon =  ((e.screenY - decalPosY) / 40)

        //déplacement mainLogo
        const moveXmainLogo =  ((e.screenX - decalPosX) / 30)
        const moveYmainLogo =  ((e.screenY - decalPosY) / 30)

        document.querySelector('#bgMoon').style.transform = `translate3d( ${moveXbgmoon}px, ${moveYbgmoon}px, 0 )`;
        document.querySelector('#moon').style.transform = `translate3d( ${moveXmoon}px, ${moveYmoon}px, 0 )`;        
        document.querySelector('#mainLogo').style.transform = `translate3d( ${moveXmainLogo}px, ${moveYmainLogo}px, 0 )`;        
    }
    */
