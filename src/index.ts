import { App } from 'vue'
import LText from './components/LText'
import LImage from './components/LImage'

// 创建业务组件数组
const components = [
  LText,
  LImage
]

// 创建install方法（vue3 创建插件的规定）
// 外部使用lego-comps方式：import legoComps(自定义名称) from 'lego-comps'
// legoComps其实就是我们导出的入口文件模块（对象），定义的install就是对象上的方法
// app.use(legoComps)，此时app.use内部会找legoComps对象上是否有install方法，并进行处理
// 按需加载并不会执行这里的install，而是执行LText/index.js的install
const install = (app: App) => {
  components.forEach( component => {
    app.component(component.name, component)
  })
}

// 实现按需加载
export {
  LText,
  LImage,
  install
}

// 默认全部导出
export default {
  install
}