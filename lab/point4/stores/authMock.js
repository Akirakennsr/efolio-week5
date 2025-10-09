import { ref } from 'vue'

export const user = ref(null)
export const initialized = ref(false)

export function initAuth(delay = 50) {
  return new Promise((resolve) => {
    setTimeout(() => {
      user.value = { id: 'u1' }
      initialized.value = true
      resolve()
    }, delay)
  })
}
