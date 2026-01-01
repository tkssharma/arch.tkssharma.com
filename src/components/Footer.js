import React from 'react'

const socialLinks = [
  { url: 'https://github.com/tkssharma', label: 'GitHub' },
  { url: 'https://twitter.com/tkssharma', label: 'Twitter' },
  { url: 'https://www.youtube.com/user/vibbbbbba', label: 'YouTube' },
  { url: 'https://www.linkedin.com/in/tkssharma', label: 'LinkedIn' },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
          <span className="desktop-only">
            © {new Date().getFullYear()} Tarun Sharma • Built with Gatsby
          </span>
        </nav>
        <nav>
          {socialLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    </footer>
  )
}
