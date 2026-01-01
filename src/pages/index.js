import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import github from '../assets/nav-github.png'
import floppy from '../assets/nav-floppy.png'
import looking from '../assets/me.jpg'

export default function WebsiteIndex({ data }) {
  const [followers, setFollowers] = useState(null)
  const latest = data.latest.edges
  const highlights = data.highlights.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedHighlights = useMemo(
    () =>
      getSimplifiedPosts(highlights, { shortTitle: true, thumbnails: true }),
    [highlights]
  )

  useEffect(() => {
    async function getGithubAPI() {
      const response = await fetch('https://api.github.com/users/tkssharma')
      const data = await response.json()

      return data
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <section className="hero-section">
        {/* Animated background elements */}
        <div className="hero-bg">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-blob hero-blob-3"></div>
          <div className="hero-wave"></div>
          <div className="hero-particles">
            <span className="particle particle-1"></span>
            <span className="particle particle-2"></span>
            <span className="particle particle-3"></span>
            <span className="particle particle-4"></span>
            <span className="particle particle-5"></span>
          </div>
          <div className="hero-dots">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="hero-lines">
            <span className="line line-1"></span>
            <span className="line line-2"></span>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-greeting">Hello, I'm</span>
              <span className="hero-name">Tarun Sharma</span>
            </h1>
            <p className="hero-subtitle">
              AI-powered solutions architect specializing in <strong>Microservices</strong>, <strong>Cloud Infrastructure</strong> (AWS/GCP), and <strong>AI/ML Integration</strong>. Building scalable distributed systems and intelligent applications.
            </p>
            <div className="hero-cta">
              <Link to="/blog" className="cta-button primary">
                <span>Read Articles</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/me" className="cta-button secondary">
                About Me
              </Link>
            </div>
            {followers && (
              <div className="hero-stats">
                <a href="https://github.com/tkssharma" target="_blank" rel="noreferrer" className="stat-item">
                  <span className="stat-number">{Number(followers).toLocaleString()}</span>
                  <span className="stat-label">GitHub Followers</span>
                </a>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Articles Written</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            )}
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img src={looking} alt="Tarun Sharma" className="hero-image" />
              <div className="hero-image-glow"></div>
            </div>
            <div className="floating-badge badge-1">
              <span>🤖</span> AI/ML
            </div>
            <div className="floating-badge badge-2">
              <span>☁️</span> AWS
            </div>
            <div className="floating-badge badge-3">
              <span>🔧</span> Microservices
            </div>
            <div className="floating-badge badge-4">
              <span>🐳</span> Kubernetes
            </div>
            <div className="floating-badge badge-5">
              <span>⚡</span> Terraform
            </div>
            <div className="floating-badge badge-6">
              <span>🧠</span> LLMs
            </div>
          </div>
        </div>
      </section>

      <article className="hero">

        <div className="container">
          <h2 className="main-header">
            <span>Latest Articles</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedLatest} />

          <h2 className="main-header">
            <span>Highlights</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedHighlights} yearOnly />

          <h2 className="main-header">Newsletter</h2>
          <div className="flex-content">
            <p>
              Subscribe to the newsletter to get my latest content by email. Not
              on any set schedule. Unsubscribe anytime.
            </p>
            <p className="hero-buttons">
              <a
                href="https://tkssharma.substack.com/subscribe"
                className="button"
              >
                Subscribe
              </a>
            </p>
          </div>
        </div>
      </article>
    </>
  )
}

WebsiteIndex.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 7
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
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
            featuredImage {
              childImageSharp {
                fixed(width: 800, height: 400) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            thumbnail {
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 99
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            shortTitle
            tags
            featuredImage {
              childImageSharp {
                fixed(width: 800, height: 400) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            thumbnail {
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
