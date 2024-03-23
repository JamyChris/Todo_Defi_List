import { createContext } from "react";

const TasksContext = createContext({
    // task
    tasks : [],
    addTask : (task) => {},
    deleteTask : (id) => {},
    updateTask : (id) => {},
    playChrono : (id) => {},
    pauseChrono : (id) => {},
    stopChrono : (id) => {},

    // notification
    isNotif : false,
    message : "",
    addNotif : (action) => {},
    quitNotif : () => {}
})

export default TasksContext;