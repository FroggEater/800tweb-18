import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
// lazy && needs to be fixed using absolute path
import Input from '../../front/components/shared/Input.vue'

describe('Input Test', () => {
  test('basic input', async () => {
    const wrapper = mount(Input);
    expect(wrapper.exists()).toBe(true)
  })
})
