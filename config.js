// 在这里模拟一下webpack
const path = require('path')
module.exports = {
  entry: './src/newIndex.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  }
}