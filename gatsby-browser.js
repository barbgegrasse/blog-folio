/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// const { registerLinkResolver } = require('gatsby-source-prismic-graphql');
// const { linkResolver } = require('./src/utils/prismic-configuration');

// registerLinkResolver(linkResolver);
const { registerLinkResolver } = require('gatsby-source-prismic-graphql')
const { linkResolver } = require('./src/utils/linkResolver')
export { default as wrapRootElement } from './src/state/ReduxWrapper'

registerLinkResolver(linkResolver)
