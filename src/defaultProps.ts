import { without, mapValues } from 'lodash-es'

// 通用属性类型定义
export interface CommonElementProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}

// 通用属性
export const commonDefaultProps: CommonElementProps = {
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
}

// LText组件特有属性类型定义
export interface TextElementProps extends CommonElementProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

// LText组件属性=特有属性+通用属性
export const textDefaultProps: TextElementProps = {
  text: '正文内容', 	// basic props - font styles
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
}

// LImage组件特有的属性类型定义
export interface ImageElementProps extends CommonElementProps {
  src: string;
}

// LImage组件属性=特有属性+通用属性
export const imageDefaultProps: ImageElementProps = {
  src: 'defalut.url',
  ...commonDefaultProps
}

// LText组件获取style属性key的数组：获取style属性的key（使用lodash的without排出和样式无关的key）
export const textStylePropsKeys = without(
	Object.keys(textDefaultProps),
	'actionType',
	'url',
	'text'
)

// LImage组件获取style属性key的数组：获取style属性的key（使用lodash的without排出和样式无关的key）
export const imageStylePropsKeys = without(Object.keys(textDefaultProps),'src')

// 元素是否正在编辑（会混入到业务组件的props中）
// 目的是解决编辑中的元素，触发点击时不会进行跳转
export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false
  }
}

// 使用lodash提供的mapValues对textDefaultProps组装成符合组件内props格式的对象
// 格式：props: { text: {type: String, default: '123'}, ...},
export const transformToComopnentProps = <T extends {}>(props: T) => {
	const mapProps =  mapValues(props, (item) => {
		return {
			type: (item as any).constructor as StringConstructor,
			default: item,
		}
	})

  return {
    ...mapProps,
    ...isEditingProp
  }
}
