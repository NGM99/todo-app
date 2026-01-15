const { body, param } = require('express-validator')

exports.createTaskValidator = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio'),

  body('description')
    .notEmpty()
    .withMessage('La descripción es obligatoria'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completado debe ser booleano')
]

exports.updateTaskValidator = [
  param('id')
    .notEmpty()
    .withMessage('Id requerido'),

  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio'),

  body('description')
    .notEmpty()
    .withMessage('La descripción es obligatoria'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completado debe ser booleano')
]
