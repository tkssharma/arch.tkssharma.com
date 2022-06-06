import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />

      <article>
        <header>
          <div className="container">
            <h1>
              <span>Posts tagged:</span>{' '}
              <span className="primary-underline">{tag}</span>
            </h1>
            <p className="description">
              <span className="count bright">{totalCount}</span>
              {message}
            </p>
          </div>
        </header>

        <section className="container">
          <Posts data={simplifiedPosts} />
        </section>
      </article>
    </>
  )
}

TagTemplate.Layout = Layout

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`
