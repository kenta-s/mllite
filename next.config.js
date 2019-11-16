const API_HOSTS = {
  'development': 'http://localhost:3000',
  'production': 'https://mllite-api.herokuapp.com',
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
