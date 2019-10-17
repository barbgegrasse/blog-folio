import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Global } from "@emotion/core";
import globalStyles from 'styles/global';
import typeStyles from 'styles/typography';
import Footer from "components/Footer";
import Header from "components/Header";
import 'styles/fonts.scss';

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

const LayoutIndex = ({ children }) => {
    return (
      <div className="container">
        <header className="header">
            <nav className="main-nav">
                <a href="#">Presentation</a>
                <a href="#">Portfolio</a>
                <a href="#">Contact</a>
                <a href="#">Blog</a>
                <a href="#">Mentions légales</a>
            </nav>
        </header>
{/*        <div id="noise" className="noise"></div>
        <div className="moon-background">
            <div className="moon-light">
                <div className="moonlight__wrap">
                    <div id="bgMoon" className="moonlight__img">
                        
                    </div>
                </div>
            </div>
    </div>*/}
        <main>{children}</main>
      </div>
    );
  };
  

LayoutIndex.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LayoutIndex;
