import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Wrapper from '../../front/components/shared/Wrapper.vue'
import Vue from 'vue'

describe('Wrapper Test', () => {
  test('basic Wrapper', async () => {
    const wrapper = mount(Wrapper);
    expect(wrapper.exists()).toBe(true)
  })
})
