module.exports = {
  siteMetadata: {
    title: `Văn-Tự`,
    siteUrl: `https://vantu.org`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-layout`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `collection`,
        path: `${__dirname}/collection`,
      }
    },
    `gatsby-plugin-mdx`
  ],
}
