const toast = document.getElementById('toast')

export const showToast = (message, type = 'success', duration = 3000) => {
  toast.textContent = message
  toast.className = `toast show ${type}`

  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.classList.add('hidden'), 300)
  }, duration)
}