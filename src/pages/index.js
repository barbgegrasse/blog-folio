import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import LayoutIndex from "../components/LayoutIndex"
import { TweenLite, Linear, TweenMax, TimelineMax, Power1, Power2, Power4,Bounce } from "gsap";
import "../styles/css/stylesheet.css"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-image"

const anchors = ["presentation", "portfolio", "contact"];
  
class FullpageWrapper extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currentProject: 0, //indice de mon projet
            projects : ["project1","project2","project3"], //liste des classes sur div de mes projets
            animProject : true,
            done : false
        }
    }

    clickNext(e){
        //Mise à jour du projet en cours
        const currentProject = this.state.currentProject
        const nextProject = currentProject + 1

        if(nextProject <  this.state.projects.length){
            new TimelineMax()
            .to('.bloc-presentation.'+this.state.projects[currentProject]+'  .title-project',1,{xPercent: -100 , ease: Power4.easeInOut})  
            .to('.bloc-presentation.'+this.state.projects[currentProject]+'  .desc-project',1,{xPercent: -100 , ease: Power4.easeInOut},'-=0.8')  
            .to('.bloc-presentation.'+this.state.projects[currentProject]+'  .technos',1,{xPercent: -100 , ease: Power4.easeInOut},'-=0.8') 
            
            //On réduit la taille des visuels
            .to('.illu-project-wrapper',1,{scaleX:0.8, scaleY:0.8, ease: Power4.easeInOut},'-=1.5') 
            .to('#fullpage', 0.5, {backgroundImage:"-webkit-linear-gradient(180deg, rgb(206, 38, 93) 100%, #ffffff 34%)", ease: Power1.easeInOut})
            .to('#fullpage', 0.5, {backgroundImage:"-webkit-linear-gradient(180deg, rgb(61, 31, 93) 34%, #ffffff 34%)", ease: Power1.easeInOut})
            
            //Décalage des visuels en meme temps
            .to('.illu-project-wrapper.'+this.state.projects[currentProject]+' .gatsby-image-wrapper',1,{xPercent: -100 , ease: Power4.easeInOut},'-=0.8') 
            .to('.illu-project-wrapper.'+this.state.projects[nextProject]+' .gatsby-image-wrapper',1,{xPercent: -100 , ease: Power4.easeInOut},'-=1') 
            
            //On augmente la taille des visuels
            .to('.illu-project-wrapper',1,{scaleX:1, scaleY:1, ease: Power4.easeInOut},'-=0.8') 

            //mise à jour du counter
            .to('.count .item.'+this.state.projects[currentProject],1.2,{yPercent: -300, ease: Power1.easeInOut},'-=0.8') 
            .to('.count .item.'+this.state.projects[nextProject],0.5,{yPercent: -100, ease: Power1.easeInOut},'-=0.8') 

            //Mise à jour du project suivant
            new TimelineMax()
            .set('.bloc-presentation.'+this.state.projects[nextProject], {className: '+=current'})
            .to('.bloc-presentation.'+this.state.projects[nextProject]+' .title-project',1,{xPercent: 100 , ease: Power4.easeInOut})  
            .to('.bloc-presentation.'+this.state.projects[nextProject]+' .desc-project',1,{xPercent: 100 , ease: Power4.easeInOut},'-=0.8')  
            .to('.bloc-presentation.'+this.state.projects[nextProject]+' .technos',1,{xPercent: 100 , ease: Power4.easeInOut},'-=0.8') ;

            //Mise à jour du projet courant
            this.setState({ currentProject: nextProject })
        }
    }
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

    componentWillMount() {
        
    }

    componentDidMount(){
        //console.log("render prop change", fullpageApi); // eslint-disable-line no-console
        new TimelineMax()
        
        //Animation des rideaux
        //.to('#fullpage', 1, {backgroundImage:"-webkit-linear-gradient(112deg, rgb(206, 38, 93) 34%, #0f0350 34%)", ease: Power1.easeInOut},'-=0.4')
        //Animation des éléments de présentation
        .to('#mainTitle',1,{marginLeft:0, ease: Power1.easeInOut},'-=1') 
        .to('#blockSpan',0.5,{xPercent:24, ease: Power2.easeInOut},'-=0.5') 
        .to('#fonction',0.5,{xPercent:100, ease: Power2.easeInOut},'-=0.5') 

        //Animation de la boule et du logo
        .to('#wrapMoon',0.9,{left:'50%', ease: Power1.easeInOut},'-=0.9') 
        .to('#wrapLogo',1,{left:'50%', ease: Power1.easeInOut},'-=1') ;
    }

    render(){

        const { data } = this.props
        const imageSoccer = data.soccerpark.childImageSharp.fluid
        const imageThalasso = data.thalasso.childImageSharp.fluid
        const imageBrito = data.brito.childImageSharp.fluid

        return (
            <LayoutIndex>
                <ReactFullpage
                    anchors={anchors}
                    animateAnchor={false}
                    navigation
                    navigationPosition={"left"}
                    sectionsColor={["transparent", "transparent", "transparent"]}
                    onLeave={(origin, destination, direction) => {
                        
                        var done = false;
                        var animationTimeout;
                        var transitionTimeout;
                        var animationTime = 900;
                        var transitionTime = 500;

                        if(origin.index == 0){

                            if (this.state.done) return ;
                            //cancel any previous timeout as onLeave fires quite a bit.
                            clearTimeout(animationTimeout);
                            clearTimeout(transitionTimeout);
                            
                            
                            // do animations

                            console.log(this.fullPageApi, this.state.done)
                            //On quitte le premier slide
                            new TimelineMax()
                            //On fait bouger le logo
                            .to('#wrapMoon',0.5,{left:'100%', opacity: 0, ease: Power4.easeInOut}) 
                            .to('#wrapLogo',0.4,{left:'100%', opacity: 0, ease: Power4.easeInOut},'-=0.5') 
                            .to('#fullpage', 1, {backgroundImage:"-webkit-linear-gradient(180deg, rgb(206, 38, 93) 34%, #ffffff 34%)", ease: Power1.easeInOut},'-=0.4')
                            if(this.state.animProject){
                                new TimelineMax()
                                .to('.movetrait',0.8,{xPercent: 100 , ease: Power4.easeInOut})  
                                .to('.'+this.state.projects[0]+' .title-project',0.8,{xPercent: 100 , ease: Power4.easeInOut},'-=0.8')   
                                .to('.'+this.state.projects[0]+' .block-span',0.5,{xPercent: 100 , ease: Power4.easeInOut},'-=0.6') 
                                .to('.'+this.state.projects[0]+' .desc-project',0.8,{xPercent: 100 , ease: Power4.easeInOut},'-=0.6')  
                                .to('.'+this.state.projects[0]+' .technos',0.8,{xPercent: 100 , ease: Power4.easeInOut},'-=0.6') 
                                .to('.illu-project-wrapper',1,{opacity:1, ease: Power1.easeInOut},'-=1') 

                                this.setState({ animProject: false })
                            }
                            
                            
                            // after animation time scroll up or down
                            animationTimeout = setTimeout(()=>{   
                                console.log("here")   
                            //deal with scroll
                            this.setState({ done: true })
                            if(direction === 'down') {
                                this.fullPageApi.moveSectionDown();
                            } else {
                                this.fullPageApi.moveSectionUp();
                            }
                            transitionTimeout=setTimeout(()=>done=false,transitionTime);
                            },animationTime);
                            return done;
                            
                        }

                        //Si je retourne sur le premier slide
                        if(destination.index == 0){
                            //console.log("here");
                            new TimelineMax()
                            .to('#wrapMoon',0.3,{left:'50%', opacity: 1, ease: Power1.easeInOut}) 
                            .to('#wrapLogo',0.5,{left:'50%', opacity: 1, ease: Power1.easeInOut},'-=0.5') 
                        }
                        
                    }}



                    
                    render={({ state, fullpageApi }) => {
                        this.fullPageApi = fullpageApi;

                        return (
                            <>
                                <div> 
                                    <div className="section section1">
                                        <div id="blockPresentation" className="block-presentation">
                                            <h1 id="mainTitle" className="main-title">
                                                <span className="item">Johan</span>
                                                <span className="item">Petri</span>
                                                <span className="item">Kovsky</span>
                                            </h1>
          
                                            <div id="blockSpan" className="block-span">
                                                <span className="item"></span>
                                                <span className="item"></span>
                                            </div>
                                            <div className="relative wrap-fonction">
                                                <h2 id="fonction" className="fonction">Front-end web developer</h2>
                                                <p id="fonction" className="fonction smaller">& Overwatch Master</p>
                                            </div>
                                            
                                        </div>

                                        <div id="blockMoon" className="block-moon">
                                            <div className="half">
                                                
                                            </div>
                                            <div className="wrap">
                                                <div id="wrapLogo" className="wrap-logo">
                                                    <div id="moon" className="moon"></div>
                                                </div>
                                                <div id="wrapMoon" className="wrap-moon">
                                                    <div id="mainLogo" className="main-logo"></div>                    
                                                </div>
                                                {
                                                    /*
                                                <div id="htmlLogo" className="html-logo">HTML</div>
                                                <div id="jsLogo" className="js-logo">Javascript</div>
                                                <div id="phpLogo" className="phpLogo">PHP</div>
                                                <div id="cssLogo" className="cssLogo">CSS</div>
                                                    */
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div id="projectKovsky" className="projects section section2">
                                        <div className="next-project" onClick={this.clickNext.bind(this)}>
                                            <div className="wrap-trait">
                                                <div className="movetrait">
                                                    

                                                    <span className="trait"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bloc-presentation current project1">
                                            <h2 id="soccertitle" className="title-project">Soccer Park</h2>
                            
                                            <div className="block-span">
                                                <span className="item"></span>
                                                <span className="item"></span>
                                            </div>

                                            <p className="desc-project">Développement et intégration de la partie front-end</p>
                                            <p className="technos">HTML/JS/CSS/SASS/PHP</p>

                                            <a className="link-project" href="#">Découvrir le projet en ligne</a>
                                        </div> 

                                        <div className="bloc-presentation project2">
                                            <h2 id="soccertitle" className="title-project">Thalasso Blanco</h2>
                            
                                            <div className="block-span">
                                                <span className="item"></span>
                                                <span className="item"></span>
                                            </div>

                                            <p className="desc-project">Développement et intégration de la partie front-end</p>
                                            <p className="technos">HTML/JS/CSS/SASS/PHP</p>

                                            <a className="link-project" href="#">Découvrir le projet en ligne</a>
                                        </div>

                                        <div className="bloc-presentation project3">
                                            <h2 id="soccertitle" className="title-project">Patisserie Britto</h2>
                            
                                            <div className="block-span">
                                                <span className="item"></span>
                                                <span className="item"></span>
                                            </div>

                                            <p className="desc-project">Personnalisation du thème, configuration et installation des plugins e-commerces.</p>
                                            <p className="technos">Wordpress + Woocommerce</p>

                                            <a className="link-project" href="#">Découvrir le projet en ligne</a>
                                        </div>
                                        <div className="illu-project-wrapper project1 current">
                                            <div className="overflow">
                                                <div className="image-hover"></div>
                                                <BackgroundImage
                                                    Tag="section"
                                                    fluid={imageSoccer}
                                                    backgroundColor={`#040e18`}
                                                    style={{position: "relative"}}
                                                    >
                                                </BackgroundImage>
                                            </div>
                                        </div>
                                        <div className="illu-project-wrapper project2">
                                            <div className="overflow">
                                                <div className="image-hover"></div>
                                                <BackgroundImage
                                                    Tag="section"
                                                    fluid={imageThalasso}
                                                    backgroundColor={`#040e18`}
                                                    style={{position: "relative"}}
                                                    >
                                                </BackgroundImage>
                                            </div>
                                        </div>
                                        <div className="illu-project-wrapper project3">
                                            <div className="overflow">
                                                <div className="image-hover"></div>
                                                <BackgroundImage
                                                    Tag="section"
                                                    fluid={imageSoccer}
                                                    backgroundColor={`#040e18`}
                                                    style={{position: "relative"}}
                                                    >
                                                </BackgroundImage>
                                            </div>
                                        </div>
                                        <div className="count">
                                            <div className="wrap-count">
                                                0
                                                <span className="item current project1">1</span>
                                                <span className="item project2">2</span>
                                                <span className="item project3">3</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    }}
                />
            </LayoutIndex>
        )
    }
};

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

export default FullpageWrapper
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
            const actionLeaveSection1 = new TimelineMax()
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

        const action = new TimelineMax()
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