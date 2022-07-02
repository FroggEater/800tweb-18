import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import App from '../../front/components/side/stepper/index.vue'
import Counter from '../../front/components/shared/Counter.vue'
import Vue from 'vue'

describe('index.vue', () => {
  it('swag', () => {
    expect(typeof App).toBe('function')
  })
})

describe('Counter', () => {
  test('Setup', () => {
    expect(true).toBe(true)
  })
})

describe('Counter Mount', () => {
  test('Increment Counter', async () => {
    const wrapper = mount(Counter);
    expect(wrapper.text()).toContain('counter: 0')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    console.log(wrapper.find('button').trigger('click').then)
    expect(wrapper.text()).toContain('counter: 1')
    console.log(wrapper.find('button'))
  })
})
