const Task = require('../models/taskModel')

const controller = {
  getAllTasks(req, res) {
    const tasks = Task.getTasks()
    res.status(200).json(tasks)
  },

  getTaskById(req, res) {
    const { id } = req.params
    const task = Task.getTaskById(id)

    if (!task) {
      return res.status(404).json({errors: [{ message: 'Tarea no encontrada'}]})
    }
    
    return res.status(200).json(task)
  },

  createNewTask(req, res) {
    let taskToCreate = {
      completed: false,
      ...req.body
    }
    const taskCreated = Task.create(taskToCreate)
    res.status(201).json(taskCreated)
  },

  updateTask(req, res) {
    const { id } = req.params
    const taskData = req.body

    const updatedTask = Task.update(id, taskData)

    if (!updatedTask) {
      return res.status(404).json({errors: [{ message: 'Tarea no encontrada'}]})
    }
 
    res.status(200).json(updatedTask)
  },

  deleteTask(req, res) {
    const { id } = req.params
    const task = Task.getTaskById(id)

    if (!task) {
      return res.status(404).json({errors: [{ message: 'Tarea no encontrada'}]})
    }

    Task.delete(id)
    res.status(204).json()
  }
}

module.exports = controller