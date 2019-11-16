const API_HOSTS = {
  'development': 'http://localhost:3000',
  'production': 'https://www.example.com',
}
module.exports = {
  webpack: (config, {}) => {
    const webpack = require('webpack');
    config.plugins = config.plugins || []
    config.plugins.push(
      new webpack.DefinePlugin({
        apiHost: JSON.stringify(API_HOSTS[config.mode]),
      })
    )

    return config
  }
}
// module.exports = {
//   webpack: (config, {}) => {
//     config.module.rules.push({
//       test: /.mdx/,
//       use: [
//         options.defaultLoaders.babel,
//         {
//           loader: '@mdx-js/loader',
//           options: pluginOptions.options
//         }
//       ]
//     })
// 
//     return config
//   }
// }
