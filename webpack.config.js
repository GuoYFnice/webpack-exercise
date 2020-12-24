// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 可以判断当前环境-可以再.env里进行配置（cross-env）
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

module.exports = {
  // mode 配置项，告知 webpack 使用相应模式的内置优化。
  mode: "development",
  /* 
  devtool 中的一些设置，可以帮助我们将编译后的代码映射回原始源代码。不同的值会明显影响到构建和重新构建的速度。
  生产环境可以使用 none 或者是 source-map，使用 source-map 最终会单独打包出一个 .map 文件，我们可以根据报错信息和此 map 文件，进行错误解析，定位到源代码。
  */
  devtool: 'cheap-module-eval-source-map', //开发环境下使用
  module: {
    /* 
      loader 需要配置在 module.rules 中，rules 是一个数组。
      loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行
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
      },
      {
        /* 
        webpack 不能直接处理 css，需要借助 loader。
        如果是 .css，我们需要的 loader 通常有： style-loader、css-loader，
        考虑到兼容性问题，还需要 postcss-loader，
        如果是 less 或者是 sass 的话，还需要 less-loader 和 sass-loader，这里配置一下 less 和 css 文件(sass 的话，使用 sass-loader即可):
        */
        test: /\.(le|c)ss$/,
        /* 
        style-loader 动态创建 style 标签，将 css 插入到 head 中.
        css-loader 负责处理 @import 等语句。
        postcss-loader 和 autoprefixer，自动生成浏览器兼容性前缀
        less-loader 负责处理编译 .less 文件,将其转为 css
        */
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')({
                  "overrideBrowserslist": [
                    ">0.25%",
                    "not dead"
                  ]
                })
              ]
            }
          }
        }, 'less-loader'],
        exclude: /node_modules/
      }
    ]
  },
  //数组 放着所有的webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      config: config.template,
      minify: {
        //是否删除属性的双引号
        removeAttributeQuotes: false,
        //是否折叠空白
        collapseWhitespace: false,
      }
      // hash: true //是否加上hash，默认是 false
    })
  ],
  devServer: {
    //默认是8080
    port: '3000',
    /* 
     启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见  (默认不启用)
     */
    quiet: false,
    //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    inline: true,
    //终端仅打印 error
    stats: "errors-only",
    //默认不启用 -当编译出错时，会在浏览器窗口全屏输出错误
    overlay: false,
    //日志等级
    clientLogLevel: "silent",
    //是否启用 gzip 压缩
    compress: true
  }
}