import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Moment from 'react-moment'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import styled from '@emotion/styled'
import colors from '../styles/colors'
import Layout from '../components/Layout'

// Slice
import Code from '../components/slices/Code'
import Text from '../components/slices/Text'
import Hn from '../components/slices/Hn'
import Image from '../components/slices/Image'

const PostHeroContainer = styled('div')`
  display: block;
  max-height: 500px;
  max-width: 980px;
  margin: 0 auto 3em;
  text-align: center;

  img {
    width: auto;
    max-height: 100%;
    max-width: 100%;
  }
`

const PostHeroAnnotation = styled('div')`
  padding-top: 0.25em;
  padding-bottom: 3rem;
  text-align: right;

  h6 {
    text-align: right;
    color: ${colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`

const PostCategory = styled('div')`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: ${colors.grey600};

  h5 {
    margin-top: 0;
    margin-bottom: 1em;
  }
`

const PostTitle = styled('div')`
  max-width: 980px;
  margin: 0 auto;
  text-align: center;

  h1 {
    margin-top: 0;
    color: ${colors.yellow500};
  }
`

const PostBody = styled('div')`
  max-width: 980px;
  margin: 0 auto;
  a {
    color: ${colors.pink900};
    text-decoration: none;
    font-style: italic;
    &:hover {
      text-decoration: underline;
    }
  }

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`

const PostMetas = styled('div')`
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${colors.grey600};
`

const PostAuthor = styled('div')`
  margin: 0;
`

const PostDate = styled('div')`
  margin: 0;
`

const PostSlices = ({ slices }) => {
  return slices.map(slice => {
    const res = (() => {
      switch (slice.type) {
        case 'code_snippet':
          return <Code slice={slice} />
        case 'hn':
          return <Hn slice={slice} />
        case 'text':
          return <Text slice={slice} />
        case 'image':
          return <Image slice={slice} />
        default:
          return false
      }
    })()
    return res
  })
}

const Post = ({ post, meta }) => {
  return (
    <>
      <Helmet
        title={`${post.post_title[0].text} | Developpeur front end Blog`}
        titleTemplate={`%s | ${meta.title}`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${post.post_title[0].text} | Developpeur front end Blog`,
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
      <Layout>
        <PostCategory>{RichText.render(post.post_category)}</PostCategory>
        <PostTitle>{RichText.render(post.post_title)}</PostTitle>
        <PostMetas>
          <PostAuthor>{post.post_author}</PostAuthor>
          <PostDate>
            <Moment format="MMMM D, YYYY">{post.post_date}</Moment>
          </PostDate>
        </PostMetas>
        {post.post_hero_image && (
          <PostHeroContainer>
            <img src={post.post_hero_image.url} alt="bees" />
            <PostHeroAnnotation>
              {RichText.render(post.post_hero_annotation)}
            </PostHeroAnnotation>
          </PostHeroContainer>
        )}
        <PostBody>
          <PostSlices slices={post.post_body} />
        </PostBody>
      </Layout>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.element.isRequired,
  meta: PropTypes.element.isRequired,
}

export default function getPost({ data }) {
  const postContent = data.prismic.allPosts.edges[0].node
  const meta = data.site.siteMetadata
  return <Post post={postContent} meta={meta} />
}

getPost.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query PostQuery($uid: String) {
    prismic {
      allPosts(uid: $uid) {
        edges {
          node {
            post_title
            post_hero_image
            post_hero_annotation
            post_date
            post_category
            post_author
            post_body {
              ... on PRISMIC_PostPost_bodyText {
                type
                label
                primary {
                  rich_text
                }
              }
              ... on PRISMIC_PostPost_bodyCode_snippet {
                type
                label
                primary {
                  code_snippet
                }
              }
              ... on PRISMIC_PostPost_bodyHn {
                type
                label
                fields {
                  hn
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
            post_preview_description
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
