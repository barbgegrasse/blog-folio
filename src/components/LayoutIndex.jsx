import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

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
  }
`
const Span = styled('span')`
  display: block;
`

/*
const LayoutIndex = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQueryIndex {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <>
            {console.log("test layout")}
                <div style="bg-fixed-home"></div>
                <Global styles={[globalStyles, typeStyles]} />
                <div className="Layout LayoutIndex">
                    <Header />
                    <main className="Layout__content">
                        {children}
                    </main>
                    <Footer />
                </div>
            </>
        )}
    />
)
*/

const LayoutIndex = ({ children, mainColor }) => {
  return (
    <div className="container">
      <header className="header">
        <MainNav>
          <Link activeClassName="Link--is-active" to="#presentation">
            <Span css={{ color: mainColor }}>Présentation</Span>
          </Link>
          <Link activeClassName="Link--is-active" to="#portfolio">
            <Span css={{ color: mainColor }}>Portfolio</Span>
          </Link>
          <Link activeClassName="Link--is-active" to="#contact">
            <Span css={{ color: mainColor }}>Contact</Span>
          </Link>
          <Link activeClassName="Link--is-active" to="/blog">
            <Span css={{ color: mainColor }}>Blog</Span>
          </Link>
          <Link activeClassName="Link--is-active" to="/mentions-legales">
            <Span css={{ color: mainColor }}>Mentions légales</Span>
          </Link>
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
