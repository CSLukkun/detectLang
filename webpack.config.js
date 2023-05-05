const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const dir = path.join(__dirname, 'src')

console.log(path.join(dir, 'index.js'))
module.exports = {
    mode: 'production',
    entry: {
        index: path.join(dir, 'index.js')
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
          XRegExp: 'xregexp'
        }
      },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: { ascii_only: true}
                }
            })
        ]
    }
}