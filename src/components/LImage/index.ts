import { App } from 'vue'
import LImage from './LImage.vue'

// 组件（对象）上添加install方法（vue3定义插件的方式）
LImage.install = (app: App) => {
  app.component(LImage.name, LImage)
}

export default LImage