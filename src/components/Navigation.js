import React from 'react'
import { Link } from 'gatsby'

import { Hamburger } from '../assets/Hamburger'

const mainNavItems = [
  { url: '/blog', emoji: '📝', label: 'Articles' },
  { url: '/projects', emoji: '🚀', label: 'Projects' },
  { url: '/me', emoji: '👨‍💻', label: 'About' },
]

const socialNavItems = [
  { url: 'https://github.com/tkssharma', emoji: '🐙', label: 'GitHub' },
  { url: 'https://twitter.com/tkssharma', emoji: '🐦', label: 'Twitter' },
]

export const Navigation = ({ setCollapsed }) => {
  return (
    <header className="navigation">
      <div className="navigation-inner">
        <nav className="brand-section">
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="desktop-only collapse-button"
            title="Collapse Sidebar"
          >
            <Hamburger />
          </button>

          <Link to="/" className="brand">
            <span>🌌 tkssharma</span>
          </Link>
        </nav>
        <div>
          <nav>
            {mainNavItems.map((item) => (
              <Link to={item.url} key={item.label} activeClassName="active">
                <span className="nav-emoji">{item.emoji}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="toolbar-section">
          <nav className="social-nav">
            {socialNavItems.map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={item.label}
                title={item.label}
              >
                <span className="nav-emoji">{item.emoji}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
