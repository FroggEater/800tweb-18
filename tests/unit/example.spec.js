import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Counter from '../../front/components/shared/Counter.vue'
import Button from '../../front/components/shared/Button.vue'
import Vue from 'vue'

describe('Button Test', () => {
  test('basic button', async () => {
    const wrapper = mount(Button);
    expect(wrapper.exists()).toBe(true)
  })
})


describe('Counter Mount', () => {
  test('Counter exists?', async () => {
    const wrapper = mount(Counter);
    expect(wrapper.exists()).toBe(true)
  })
  test('Increment Counter', async () => {
    const wrapper = mount(Counter);
    expect(wrapper.text()).toContain('counter: 0')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.text()).toContain('counter: 1')
  })
})
