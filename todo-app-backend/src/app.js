const express = require('express')
const cors = require('cors')
require('dotenv').config()

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const taskRoutes = require('./routes/taskRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Todo App API running',
  })
})

// Swagger Config
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// Routes
app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log(`Servidor arriba en: http://localhost:${PORT}`)
  console.log(`Swagger disponible en: http://localhost:${PORT}/api-docs`)
})
