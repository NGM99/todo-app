const { v4: uuidv4 } = require('uuid');

const Task = {
	tasks: [],

	getTasks() {
		return this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
	},

	getTaskById(taskId) {
		const allTasks = this.getTasks()
		const taskById = allTasks.find((e) => e.id === taskId)
		return taskById
	},

	create(taskData) {
		const allTasks = this.getTasks()
		const newTask = {
			id: uuidv4(),
			...taskData,
			createdAt: new Date()
		}
		allTasks.push(newTask)
		return newTask
	},

	update(taskId, newData) {
		const allTasks = this.getTasks()
		const taskToUpdate = allTasks.find((e) => e.id === taskId)

		if (!taskToUpdate) {
			return null
		}

		const task = Object.assign(taskToUpdate, newData)
		return task
	},

	delete(taskId) {
		const allTasks = this.getTasks()
		const indexToDelete = allTasks.findIndex((e) => e.id === taskId)
		allTasks.splice(indexToDelete, 1)
		return true
	}
}

module.exports = Task