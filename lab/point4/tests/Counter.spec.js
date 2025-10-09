import { mount } from '@vue/test-utils'
import Counter from '../lab/point4/components/Counter.vue'

test('increments when writable', async () => {
  const w = mount(Counter, { props: { readonly: false } })
  await w.get('[data-test="btn"]').trigger('click')
  expect(w.get('[data-test="value"]').text()).toBe('1')
})

test('does NOT increment when readonly', async () => {
  const w = mount(Counter, { props: { readonly: true } })
  await w.get('[data-test="btn"]').trigger('click')
  // keep 0 - currently fails (exposes the bug)
  expect(w.get('[data-test="value"]').text()).toBe('0')
})

test('multiple clicks when writable increase accordingly', async () => {
  const w = mount(Counter, { props: { readonly: false } })
  const btn = w.get('[data-test="btn"]')
  await btn.trigger('click'); await btn.trigger('click'); await btn.trigger('click')
  expect(w.get('[data-test="value"]').text()).toBe('3')
})