/* eslint  react/prop-types: 0 */
import React from "react";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />;
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.headComponents}
          {css}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#D0E0D8" />
          <meta name="apple-mobile-web-app-title" content="Lazywill" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-57x57.png" sizes="57x57" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-60x60.png" sizes="60x60" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-72x72.png" sizes="72x72" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-76x76.png" sizes="76x76" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-114x114.png" sizes="114x114" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-120x120.png" sizes="120x120" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-144x144.png" sizes="144x144" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-152x152.png" sizes="152x152" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" sizes="180x180" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
       <meta charset="utf-8"/>
       <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=contain"/>
        <title>@tkssharma | DevOps Blogs</title>
        <meta name="title" content="@Tkssharma Profile – DevOps Blogs"/>
        <meta name="referrer" content="always"/>
        <meta name="description" content="Hi, I’m Tarun.😎 Nice to meet you.I am Publisher, Trainer  Developer, working on Enterprise and open source Technologies JavaScript frameworks (React  Angular 2.x), I work with client side and server side javascript programming which includes node js or any other frameworks Currently working with JavaScript framework React &amp; Node js 🚀 with Graphql 🎉"/>
       <meta name="keywords" content="TARUN, NODE JS, SHARMA, TARUN, TKSSHARMA DevOps Docker Kubernetes"/>
        <meta property="og:title" content="Javascript Developers – @tkssharma"/>
        <meta property="twitter:title" content="Javascript Developers – @tkssharma"/>
        <meta property="og:url" content="https://medium.com/tkssharma"/>
        <meta property="og:image" content="https://cdn-images-1.medium.com/max/1200/1*Ma0xo9WikLdWZNwjXpZ0_Q.png"/>
        </head>
        <body {...this.props.bodyAttributes}>
          <noscript>You need to enable JavaScript to run this app!</noscript>
          {this.props.preBodyComponents}
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
