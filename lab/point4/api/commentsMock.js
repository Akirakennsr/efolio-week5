export function fetchComments(uid, delay = 10) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, by: uid, text: 'hello' }]), delay)
  })
}
