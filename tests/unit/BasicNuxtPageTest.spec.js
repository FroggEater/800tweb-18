import { shallowMount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Page from '../../front/pages/index.vue'
import Vue from 'vue'

describe('Page Test', () => {
  test('basic Page', async () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.exists()).toBe(true)
  })
})
