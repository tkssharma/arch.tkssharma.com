const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "@tkssharma | Application Architecture Concepts", // <title>
  shortSiteTitle: "@tkssharma | Build scalabale Architecture", // <title> ending for posts and pages
  siteDescription:
    "I'm a full stack software developer creating open source projects and writing about modern JavaScript client and server side. This website i will use to Post some Architecture level Discussion for Different Projects ",
  siteUrl: "https://arch.tkssharma.com",
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "en",
  // author
  authorName: "Tarun Sharma",
  authorTwitterAccount: "@tkssharma",
  // info
  infoTitle: "@tkssharma",
  infoTitleNote: "personal blog on Application Architecture",
  // manifest.json
  manifestName: "Blogs on my work in different Apps",
  manifestShortName: "PersonalBlog", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "tarun.softengg@gmail.com",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/tkssharma" },
    { name: "twitter", url: "https://twitter.com/tkssharma" },
    { name: "facebook", url: "https://facebook.com" }
  ]
};
