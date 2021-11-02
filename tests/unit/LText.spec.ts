import { shallowMount } from '@vue/test-utils'
import LText from '../../src/components/LText'
import { textDefaultProps } from '../../src/defaultProps'

describe('LText Test', () => {
  const { location } = window
  beforeEach(() => {
    // 将浏览器对象window的属性location下的href设置为可写的字符串
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: ''
      }
    })
  })

  afterEach(() => {
    window.location = location
  })
  it('测试LText渲染相关', () => {
    const textVal = 'test'
    const props = {
      ...textDefaultProps,
      text: textVal
    }
    const wrapper = shallowMount(LText, {
      props
    })
    // 是否成功渲染text内容
    expect(wrapper.text()).toBe(textVal)
    // 是否使用tag作为标签(默认DIV)
    expect(wrapper.element.tagName).toBe('DIV')
    // 样式属性是否包含textDefaultProps
    expect(wrapper.attributes().style.includes('font-size')).toBeTruthy()
    // 屬性中是否包含过滤的内容
    expect(wrapper.attributes().style.includes('actionType')).toBeFalsy()
  })

  it('测试是否跳转', async () => {
    const props = {
      ...textDefaultProps,
      actionType: 'url',
      url: 'http://test.url',
      tag: 'h2'
    }
    const wrapper = shallowMount(LText, { props })

    // 是否使用h2渲染
    expect(wrapper.element.tagName).toBe('H2')
    // 触发点击
    await wrapper.trigger('click')
    // 触发点击后，当前地址栏的href是否是http://test.url
    expect(window.location.href).toBe('http://test.url')
  })

  it('测试ieEditing为true时是否没跳转', async () => {
    const props = {
      ...textDefaultProps,
      actionType: 'url',
      url: 'http://test.url',
      tag: 'h2',
      isEditing: true
    }
    const wrapper = shallowMount(LText, { props })

    // 触发点击
    await wrapper.trigger('click')
    // 触发点击后，当前地址栏的href是否是http://test.url
    expect(window.location.href).not.toBe('http://test.url')
  })
})