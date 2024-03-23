import "./style.css";
import { useState } from "react";
import BoxTask from "./components/BoxTask";
import TasksContext from "./contextes/TasksContext"; 
import Notif from "./components/Notif";

const App = () => {
  
  // task
  const [tasks, setTasks] = useState([
    {id:1, titre:"Apprendre React", created:"26/02/2024", tempEcoulé:0, isChronoPlayed:false, isCompleted: false, isDefi:true, timeDefi:3600},
    {id:2, titre:"Faire une course", created:"26/02/2024", tempEcoulé:0, isChronoPlayed:false, isCompleted: false, isDefi:false},
    {id:3, titre:"faire un sport", created:"26/02/2024", tempEcoulé:0, isChronoPlayed:false, isCompleted: false, isDefi:false}
  ])

  const [isNotif, setIsNotif] =  useState(false);
  const [message, setMessage] = useState("")

  const handleAddTask = (user) => {
    setTasks([...tasks, user]);
  }

  const handleDeleteTask = (id) => {
    setTasks(dernierTasks => dernierTasks.filter(task => task.id !== id))
  }

  const handlePlayChrono = (id) => {
      setTasks(dernierTasks => dernierTasks.map(task => {
        if (id === task.id) {
          return {
            ...task,
            isChronoPlayed : true,
            tempEcoulé : task.tempEcoulé + 1 
          }
        }
        else{
          return {...task}
        }
      } ))
  }

  const handleStopChrono = (id) => {
    setTasks(dernierTasks => dernierTasks.map(task => {
      if (id === task.id) {
        return {
          ...task,
          isCompleted : true
        }
      }
      else{
        return {...task}
      }
    }))
  }


  const handlePauseChrono = (id) => {
    setTasks(dernierTasks => dernierTasks.map(task => {
        if (id === task.id) {
          return {
            ...task,
            isChronoPlayed : false
          }
        }
        else{
          return {...task}
        }
      }))
    }

  const handleUpdateTask = (id) => (value) => {
    setTasks(dernierTasks => dernierTasks.map(task => {
      if (id === task.id){
        return{
          ...task,
          ...value
        }
      }

      else {
        return {...task}
      }
    }))
  } 

  const onAddNotif = (action) => {
    setIsNotif(true)
    switch (action) {
      case "add":
        setMessage(`Tâche ajoutée !`)
       
        break;
        
      case "delete":
        setMessage(`Tâche supprimée !`)
        
        break;

      case "défi-terminé":
        setMessage(`Votre defi est terminée !`)
        
        break;
      
      case "tâche-fini":
        setMessage('Tâche fini !')
    }
  }

  const onQuitNotif = () => {
    setIsNotif(false)
  }

  return (
    <TasksContext.Provider value={{isNotif, message, tasks, addTask:handleAddTask, playChrono:handlePlayChrono, pauseChrono:handlePauseChrono, updateTask:handleUpdateTask, stopChrono:handleStopChrono, deleteTask:handleDeleteTask, addNotif:onAddNotif, quitNotif:onQuitNotif}}>
      <div className="app">
        <div className="box-view">
              <BoxTask/>
              <Notif />
        </div>
      </div>
    </TasksContext.Provider>
    
  )
}

export default App;
