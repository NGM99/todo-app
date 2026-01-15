const express = require('express')
const router = express.Router()

// Controller
const taskController = require('../controllers/taskController')

// Middlewares
const validationResult = require('../middlewares/validateResultMiddleware')
const { createTaskValidator, updateTaskValidator } = require('../middlewares/validateTaskMiddleware')

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/', taskController.getAllTasks)

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener tarea por Id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', taskController.getTaskById)

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Hacer la tarea de matemáticas"
 *             description: "Resolver los ejercicios de la página 45"
 *             completed: false
 *     responses:
 *       201:
 *         description: Tarea creada
 *       400:
 *         description: Datos inválidos
 */
router.post('/', createTaskValidator, validationResult, taskController.createNewTask)

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por Id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Hacer la tarea de matemáticas"
 *             description: "Resolver los ejercicios de la página 45"
 *             completed: false
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/:id', updateTaskValidator, validationResult, taskController.updateTask)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por Id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', taskController.deleteTask)

module.exports = router