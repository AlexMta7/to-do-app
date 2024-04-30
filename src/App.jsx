import { useState } from 'react'
import AddButton from './components/AddButton'
import AddTask from './components/AddTask'
import Cards from './components/Cards'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    { id: 4, title: 'Task 4', completed: true },
    { id: 5, title: 'Task 5', completed: false },
    { id: 6, title: 'Task 6', completed: true },
    { id: 7, title: 'Task 7', completed: false },
    { id: 8, title: 'Task 8', completed: true },
    { id: 9, title: 'Task 9', completed: false },
    { id: 10, title: 'Task 10', completed: true },
  ])
  // Shows the AddTask component
  const [addTask, setAddTask] = useState(false)

  const newTask = (task) => {
    console.log(task)
    setTasks([...tasks, { id: tasks.length + 1, title: task }])
  }

  const editTask = (item) => {
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
    setTasks(newTasks)
  }

  const deleteTask = (id) => {
    console.log(id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleShowAdd = () => {
    setAddTask(true)
  }

  console.log(tasks)

  return (
    <div className='container d-flex flex-wrap  p-4 gap-3'>
      <Cards
        tasks={tasks}
        setTasks={setTasks}
        editTask={editTask}
        deleteTask={deleteTask}
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

