import './index.less';
/* 
test 1 使用es6的class语法
需要使用babel-loader对js进行低版本的转换
*/
class Animal {
  constructor(name) {
      this.name = name;
  }
  getName() {
      return this.name;
  }
}

// 打开注释会热加载整个页面
// if(module && module.hot) {
//   module.hot.accept()
// }
const dog = new Animal('dog');