var plugins = [{
      plugin: require('/Users/victoriaedwards/Documents/courses/master-gatsby/starter-files/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/victoriaedwards/Documents/courses/master-gatsby/starter-files/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"npfx97lq","dataset":"production","watchMode":true,"token":"skqKPaUHGTtidhdL9Vekm9oSvN8EGAiruelPdBK2pCsicCWFPoiZHLzjlVxrxttucd8MYxlw9fWOviVy7rRL8OP6Xxmng0xtyOpxIkberNuLT36vYJUvy2RoBd2bnOdiYKnYWs7HRFDLUdtFjU1DBIv25aE0q9RfaNAgb2ZlM6stIACcClxw"},
    },{
      plugin: require('/Users/victoriaedwards/Documents/courses/master-gatsby/starter-files/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
