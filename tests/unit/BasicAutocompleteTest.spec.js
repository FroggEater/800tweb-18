import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Autocomplete from '../../front/components/shared/Autocomplete.vue'
import Vue from 'vue'

describe('Autocomplete Test', () => {
  test('basic Autocomplete', async () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.exists()).toBe(true)
  })
})
