import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import colors from '../styles/colors'

const MainNav = styled('nav')`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
  z-index: 10;
  width: 100%;
  background-color: #fff;

  a {
    font-family: 'Share Tech Mono';
    font-size: 24px;
    text-transform: uppercase;
    color: #fff;
    margin-right: 25px;
    text-decoration: none;
    color: #0f0350;
    &.active {
      color: ${colors.pink900};
    }
  }
`

const LayoutIndex = ({ children, mainColor }) => {
  return (
    <div className="container">
      <header className="header">
        <MainNav id="mainmenu">
          <a
            title="presentation"
            href="#presentation"
            data-menuanchor="presentation"
            className="active"
          >
            Présentation
          </a>
          <a title="Portfolio" href="#portfolio" data-menuanchor="portfolio">
            Portfolio
          </a>
          <a title="Contact" href="#contact" data-menuanchor="contact">
            Contact
          </a>
          <Link to="/blog">Blog</Link>
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
