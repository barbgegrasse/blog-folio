/* eslint-disable no-underscore-dangle */
// const path = require('path')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await wrapper(
    graphql(`
      {
        prismic {
          allPosts {
            edges {
              node {
                post_title
                post_hero_image
                post_hero_imageSharp {
                  childImageSharp {
                    children {
                      ... on ImageSharp {
                        id
                        fluid {
                          aspectRatio
                          srcWebp
                          srcSetWebp
                        }
                      }
                    }
                  }
                }
                post_hero_annotation
                post_date
                post_category
                post_preview_description
                post_author
                post_body {
                  ... on PRISMIC_PostPost_bodyText {
                    type
                    label
                    primary {
                      rich_text
                    }
                  }
                  ... on PRISMIC_PostPost_bodyHn {
                    type
                    label
                  }
                  ... on PRISMIC_PostPost_bodyCode_snippet {
                    type
                    label
                    primary {
                      code_snippet
                    }
                  }
                  ... on PRISMIC_PostPost_bodyHighlighted_text {
                    type
                    label
                    primary {
                      highlight_title
                    }
                  }
                  ... on PRISMIC_PostPost_bodyImage {
                    type
                    label
                    primary {
                      image
                    }
                  }
                }
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    `)
  )

  const postsList = result.data.prismic.allPosts.edges

  const postTemplate = require.resolve('./src/templates/post.jsx')

  postsList.forEach(edge => {
    createPage({
      type: 'Project',
      match: '/blog/:uid',
      path: `/blog/${edge.node._meta.uid}`,
      component: postTemplate,
      context: {
        uid: edge.node._meta.uid,
      },
    })
  })
}
