import React, { Component } from 'react'
import patreon from '../../content/thumbnails/patreon.png'
import kofi from '../../content/thumbnails/kofi.png'
import YouTube from '../../content/thumbnails/youtube.svg'
import tks from '../../content/images/profile.png'

export default class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <div className="flex-avatar">
              <img className="avatar" src={tks} alt="tkssharma profile" />
            </div>
            <div>
              <p>
                I am Publisher, Trainer Developer, working on Enterprise and open source Technologies JavaScript frameworks (React Angular 2.x), I work with client side and server side javascript programming which includes node js or any other frameworks Currently working with JavaScript framework React & Node js 🚀 with Graphql 🎉
                <strong>
                  I am passionate Javascript developer writing end to end application using javascript using React, Angular 🅰️, Vue JS with Node JS
                </strong>
              </p>

              <div className="flex">
                <a
                  href="https://ko-fi.com/tkssharma"
                  className="donate-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img style={{ 'paddingRight': '10px' }} src={kofi} height="30" width="40" alt="Patreon" /> Buy me Coffee
                </a>
                <a
                  className="patreon-button"
                  href="https://www.patreon.com/tkssharma"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={patreon} height="50" width="50" alt="Patreon" /> Become a Patron
                </a>

                <a
                  className="youtube-button"
                  href="https://www.youtube.com/user/vibbbbbba?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={YouTube} height="50" width="50" alt="YouTube" /> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}
