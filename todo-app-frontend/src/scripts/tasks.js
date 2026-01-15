import api from '../services/api.js'
import { showToast } from '../utils/toast.js'

export function initTasks() {
  const list = document.getElementById('task-list')
  const form = document.getElementById('task-form')
  const titleInput = document.getElementById('title')
  const descriptionInput = document.getElementById('description')
  const loading = document.getElementById('loading')

  const showLoading = () => loading.classList.remove('hidden')
  const hideLoading = () => loading.classList.add('hidden')

  const getTasks = async () => {
    showLoading()
    try {
      const res = await api.get('/tasks')
      renderTasks(res.data)
    } finally {
      hideLoading()
    }
  }

  const renderTasks = (tasks) => {
    list.innerHTML = ''

    tasks.forEach(task => {
      const li = document.createElement('li')
      li.className = task.completed ? 'completed' : ''

      li.innerHTML = `
        <div class="task-card">
          <div class="task-header">
            <input data-action="check" type="checkbox" class="edit-completed" ${task.completed ? 'checked' : ''} />
            <input class="edit-title" value="${task.title}" placeholder="Título" />
          </div>

          <input class="edit-description" value="${task.description || ''}" placeholder="Descripción" />

          <div class="task-actions">
            <button data-action="save" class="btn save">
              Guardar
            </button>

            <button data-action="delete" class="btn delete">
              Eliminar
            </button>
          </div>
        </div>
      `
      // event to update task
      const updateTask = async () => {
        showLoading()
        try {
          await api.put(`/tasks/${task.id}`, {
            title: li.querySelector('.edit-title').value,
            description: li.querySelector('.edit-description').value,
            completed: li.querySelector('.edit-completed').checked
          })
          showToast('Tarea actualizada correctamente', 'success')
          await getTasks()
        } finally {
          hideLoading()
        }
      }

      li.querySelector('[data-action="save"]').onclick = () => updateTask()

      li.querySelector('[data-action="check"]').onclick = () => updateTask()

      // event to update task
      li.querySelector('[data-action="delete"]').onclick = async () => {
        showLoading()
        try {
          await api.delete(`/tasks/${task.id}`)
          showToast('Tarea Eliminada correctamente', 'success')
          await getTasks()
        } finally {
          hideLoading()
        }
      }

      list.appendChild(li)
    })
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    showLoading()

    try {
      await api.post('/tasks', {
        title: titleInput.value,
        description: descriptionInput.value,
        completed: false
      })

      form.reset()
      showToast('Tarea guardada correctamente', 'success')
      await getTasks()
    } finally {
      hideLoading()
    }
  })

  getTasks()
}
