import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Collapse from '../../front/components/shared/Collapse.vue'
import Vue from 'vue'

describe('Button Test', () => {
  test('basic button', async () => {
    const wrapper = mount(Collapse);
    expect(wrapper.exists()).toBe(true)
  })
})
