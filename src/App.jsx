import { useEffect, useState } from 'react'
import AddButton from './components/AddButton'
import AddTask from './components/AddTask'
import Cards from './components/Cards'
import { createTask, deleteTask, getTasks, updateTask } from './services/TaskServices'

function App() {
  const [tasks, setTasks] = useState([])
  // Shows AddTask component
  const [addTask, setAddTask] = useState(false)

  useEffect(() => {
    obtenerTasks()
  }, [])

  const obtenerTasks = async () => {
    try {
      const response = await getTasks()
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const newTask = async (task) => {
    try {
      const newTask = { title: task, completed: false }
      const resp = await createTask(newTask)
      // Obtener el id de la tarea creada
      setTasks([
        ...tasks,
        { id: resp.data.id, title: resp.data.title, completed: resp.data.completed },
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const editTask = async (item) => {
    try {
      const { id, title, completed } = item
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          if (task.title !== title || task.completed !== completed) {
            task.title = title
            task.completed = !completed
          }
        }
        return task
      })

      await updateTask(item)
      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleShowAdd = () => {
    setAddTask(true)
  }

  return (
    <div className='container d-flex flex-wrap  p-4 gap-3'>
      <Cards
        tasks={tasks}
        setTasks={setTasks}
        editTask={editTask}
        deleteTask={deleteTaskById}
      />
      {addTask ? (
        <AddTask setAddTask={setAddTask} onClick={newTask} />
      ) : (
        <AddButton onClick={handleShowAdd} />
      )}
    </div>
  )
}

export default App
