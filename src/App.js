import React,{ useState, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';


const App = () => {   
  const [tasks,setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

useEffect(() => {
    const getTasks = async () =>{
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }
, [])


// Delete Task
    const deleteTask = async (id) =>{
      await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE',
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }



// FETCH TASKS
  const fetchTasks = async () =>{  
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data
  }

// FETCH SINGLE TASK 
const fetchTask = async (id) =>{  
  const res = await fetch(`http://localhost:5000/${id}`)
  const data = await res.json()
  return data
  }



//TOGGLE REMINDER
    const toggleReminder = async (id) =>{
      const taskToToggle = await fetchTask(id)
      const updTask = {...taskToToggle,
      reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(updTask)
      })
      const data = res.json()

      setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder} : task
      ))
    }



//ADD TASK
    const addTask = async (task) =>{
      const res = await fetch('http://localhost:5000/tasks/',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(task)
      })
      const data = await res.json()
      setTasks([...tasks,data])
    }
 

  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? 
      <Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder}
      /> 
      : 
      'No Task To Show'}
    </div>
  )
}
export default App
