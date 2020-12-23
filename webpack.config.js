module.exports = {
  module: {
    /* 
      loader 需要配置在 module.rules 中，rules 是一个数组。
    */
    rules: [
      {
        test: /\.jsx?$/,
        /* 
        use 字段有几种写法可以是一个字符串，例如上面的 use: 'babel-loader'
        use 字段可以是一个数组，例如处理CSS文件是，use: ['style-loader', 'css-loader']
        use 数组的每一项既可以是字符串也可以是一个对象，当我们需要在webpack 的配置文件中对 loader 进行配置，就需要将其编写为一个对象，并且在此对象的 options 字段中进行配置
        */
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 3
                }
              ]
            ]
          }
        },
        //排除 node_modules 目录
        exclude: /node_modules/
      }
    ]
  }
}