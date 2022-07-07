import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Dropdown from '../../front/components/shared/Dropdown.vue'
import Vue from 'vue'

describe('Dropdown Test', () => {
  test('basic button', async () => {
    const wrapper = mount(Dropdown);
    expect(wrapper.exists()).toBe(true)
  })
})
