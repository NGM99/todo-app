import './style.css'
import { initTasks } from './scripts/tasks.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div id="loading" class="loading hidden">Cargando...</div>
    <h1>TODO APP</h1>

    <form id="task-form">
      <input id="title" placeholder="Título" />
      <input id="description" placeholder="Descripción"/>
      <button class="btn" type="submit">Agregar</button>
    </form>

    <ul id="task-list"></ul>
  </div>
`
initTasks()
