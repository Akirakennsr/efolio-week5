import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import * as auth from '../stores/authMock'
import Buggy from '../components/CommentsBug.vue'

beforeEach(() => {
  auth.user.value = null
  auth.initialized.value = false
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

test('race: mounted before auth init → stays empty (BUG)', async () => {
  const w = mount(Buggy)          // Component is mounted first (auth not ready)
  const p = auth.initAuth(50)     // Auth will be ready at t=50ms

  await vi.runOnlyPendingTimersAsync() // Run the t=0 queue (logic inside mounted)
  await vi.advanceTimersByTimeAsync(60) // Advance beyond 50ms

  // Component does not listen, after auth is ready it does not load → still 0 (here we intentionally assert 1 to make it fail)
  expect(w.get('[data-test="count"]').text()).toBe('1') // Expected FAIL
  await p
})

test('control: auth ready before mount → loads once', async () => {
  const p = auth.initAuth(0)          // Start a 0ms timer
  await vi.runOnlyPendingTimersAsync() // Trigger the 0ms timer
  await p                              // Wait for the Promise to resolve

  const w = mount(Buggy)
  await vi.advanceTimersByTimeAsync(10) // 10ms delay for commentsMock
  expect(w.get('[data-test="count"]').text()).toBe('1') // PASS
})
