import { App } from 'vue'
import LText from './LText.vue'

// 组件（对象）上添加install方法（vue3定义插件的方式）
LText.install = (app: App) => {
  app.component(LText.name, LText)
}

export default LText