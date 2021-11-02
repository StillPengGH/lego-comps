import { name } from '../package.json'
import vuePlugin from 'rollup-plugin-vue'
import cssPlugin from 'rollup-plugin-css-only'
import tsPlugin from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// 处理输出目录及文件名称
const file = (type) => `dist/${name}.${type}.js`

// tsconfig.js 覆盖重写相关配置
const tsconfigOverrides = {
  compilerOptions: { declaration: true }, // 是否生成ts类型定义文件
  exclude: [  // 对那些文件不进行ts相关处理（不需要处理的模块）
    'node_modules',
  ]
}

export { name, file}

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    tsPlugin({
      tsconfigOverride: tsconfigOverrides
    }),
    vuePlugin(),
    cssPlugin({
      output: 'bundle.css'
    }),
  ],
  external: ['vue', 'lodash-es']
}