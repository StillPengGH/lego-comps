(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('lodash-es')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'lodash-es'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LegoComps = {}, global.Vue, global._));
})(this, (function (exports, vue, lodashEs) { 'use strict';

  // 通用属性
  const commonDefaultProps = {
      // actions
      actionType: '',
      url: '',
      // size
      height: '',
      width: '318px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      // border type
      borderStyle: 'none',
      borderColor: '#000',
      borderWidth: '0',
      borderRadius: '0',
      // shadow and opacity
      boxShadow: '0 0 0 #000000',
      opacity: '1',
      // position and x,y
      position: 'absolute',
      left: '0',
      top: '0',
      right: '0'
  };
  // LText组件属性=特有属性+通用属性
  const textDefaultProps = {
      text: '正文内容',
      fontSize: '14px',
      fontFamily: '',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      lineHeight: '1',
      textAlign: 'left',
      color: '#000000',
      backgroundColor: '',
      ...commonDefaultProps
  };
  // LImage组件属性=特有属性+通用属性
  const imageDefaultProps = {
      src: 'defalut.url',
      ...commonDefaultProps
  };
  // LText组件获取style属性key的数组：获取style属性的key（使用lodash的without排出和样式无关的key）
  const textStylePropsKeys = lodashEs.without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
  // LImage组件获取style属性key的数组：获取style属性的key（使用lodash的without排出和样式无关的key）
  const imageStylePropsKeys = lodashEs.without(Object.keys(textDefaultProps), 'src');
  // 元素是否正在编辑（会混入到业务组件的props中）
  // 目的是解决编辑中的元素，触发点击时不会进行跳转
  const isEditingProp = {
      isEditing: {
          type: Boolean,
          default: false
      }
  };
  // 使用lodash提供的mapValues对textDefaultProps组装成符合组件内props格式的对象
  // 格式：props: { text: {type: String, default: '123'}, ...},
  const transformToComopnentProps = (props) => {
      const mapProps = lodashEs.mapValues(props, (item) => {
          return {
              type: item.constructor,
              default: item,
          };
      });
      return {
          ...mapProps,
          ...isEditingProp
      };
  };

  // 处理业务组件通用逻辑
  const useComponentCommon = (props, picks) => {
      const styleProps = vue.computed(() => lodashEs.pick(props, picks));
      const handleClick = () => {
          if (props.actionType === 'url' && props.url && !props.isEditing) {
              window.location.href = props.url;
          }
      };
      return {
          styleProps,
          handleClick
      };
  };

  // 获取props属性对象
  const defaultProps$1 = transformToComopnentProps(textDefaultProps);
  var script$1 = vue.defineComponent({
      name: 'LText',
      props: {
          tag: {
              type: String,
              default: 'div'
          },
          ...defaultProps$1
      },
      setup(props) {
          // 筛选出props中style相关的属性，组成对象，筛选结果：{fontSize:'12px'}
          // const styleProps = computed(() => pick(props, textStylePropsKeys))
          // 处理公共逻辑（获取style属性和点击事件处理）
          const { styleProps, handleClick } = useComponentCommon(props, textStylePropsKeys);
          return {
              styleProps,
              handleClick
          };
      },
  });

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
      style: vue.normalizeStyle(_ctx.styleProps),
      class: "l-text-component",
      onClick: _ctx.handleClick
    }, {
      default: vue.withCtx(() => [
        vue.createTextVNode(vue.toDisplayString(_ctx.text), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["style", "onClick"]))
  }

  script$1.render = render$1;
  script$1.__scopeId = "data-v-6bf95b7a";
  script$1.__file = "src/components/LText/LText.vue";

  // 组件（对象）上添加install方法（vue3定义插件的方式）
  script$1.install = (app) => {
      app.component(script$1.name, script$1);
  };

  // 通过defaultProps中定义的默认属性对象 转换为 符合组件props格式的对象
  const defaultProps = transformToComopnentProps(imageDefaultProps);
  var script = vue.defineComponent({
      name: 'LImage',
      props: {
          ...defaultProps
      },
      setup(props) {
          // 业务组件通用逻辑处理：获取styleProps、添加handleClick函数定义
          const { styleProps, handleClick } = useComponentCommon(props, imageStylePropsKeys);
          return {
              styleProps,
              handleClick
          };
      },
  });

  const _hoisted_1 = ["src"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("img", {
      class: "l-image-component",
      src: _ctx.src,
      style: vue.normalizeStyle(_ctx.styleProps),
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
    }, null, 12 /* STYLE, PROPS */, _hoisted_1))
  }

  script.render = render;
  script.__scopeId = "data-v-1e970aa2";
  script.__file = "src/components/LImage/LImage.vue";

  // 组件（对象）上添加install方法（vue3定义插件的方式）
  script.install = (app) => {
      app.component(script.name, script);
  };

  // 创建业务组件数组
  const components = [
      script$1,
      script
  ];
  // 创建install方法（vue3 创建插件的规定）
  // 外部使用lego-comps方式：import legoComps(自定义名称) from 'lego-comps'
  // legoComps其实就是我们导出的入口文件模块（对象），定义的install就是对象上的方法
  // app.use(legoComps)，此时app.use内部会找legoComps对象上是否有install方法，并进行处理
  // 按需加载并不会执行这里的install，而是执行LText/index.js的install
  const install = (app) => {
      components.forEach(component => {
          app.component(component.name, component);
      });
  };
  // 默认全部导出
  var index = {
      install
  };

  exports.LImage = script;
  exports.LText = script$1;
  exports["default"] = index;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
