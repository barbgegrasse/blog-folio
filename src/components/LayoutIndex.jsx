import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
// import { Link } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import colors from '../styles/colors'
import chevronSvg from '../images/logo4.svg'

const MainNav = styled('nav')`
  position: fixed;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
  width: 100%;

  background-color: #fff;

  a {
    margin-right: 25px;
    font-family: 'Share Tech Mono';
    font-size: 24px;
    text-transform: uppercase;
    text-decoration: none;
    color: #0f0350;

    transition: all 0.5s ease-out;
    &.active {
      color: ${colors.pink900};
    }
  }
`

const MiniLogo = styled('div')`
  opacity: 0;
  position: fixed;
  z-index: 20;
  top: 10px;
  left: -11%;

  display: block;
  width: 80px;
  height: 80px;

  border-radius: 50%;
  background-color: ${colors.pink900};

  transition: all 0.3s linear;
`
const ChevronContainer = styled('div')`
  position: relative;

  display: block;
  width: 100%;
  height: 100%;
`
const Chevron = styled('div')`
  display: block;
  width: 50px;
  height: 37px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-image: url(${chevronSvg});
  background-size: cover;
`

const LayoutIndex = ({ children, mainColor }) => {
  return (
    <div className="container">
      <header className="header">
        <MiniLogo id="miniLogo" style={{ backgroundColor: mainColor }}>
          <ChevronContainer>
            <Chevron />
          </ChevronContainer>
        </MiniLogo>
        <MainNav id="mainmenu">
          <a
            title="presentation"
            href="#presentation"
            data-menuanchor="presentation"
            className="active"
          >
            Présentation
          </a>
          <a
            title="Portfolio"
            style={{ color: mainColor }}
            href="#portfolio"
            data-menuanchor="portfolio"
          >
            Portfolio
          </a>
          <a title="Contact" href="#contact" data-menuanchor="contact">
            Contact
          </a>
          <AniLink swipe direction="up" to="blog">
            Blog
          </AniLink>
        </MainNav>
      </header>
      <main>{children}</main>
    </div>
  )
}

LayoutIndex.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(
  state => ({
    mainColor: state.app.mainColor,
  }),
  null
)(LayoutIndex)

LayoutIndex.propTypes = {
  mainColor: PropTypes.element.isRequired,
}
