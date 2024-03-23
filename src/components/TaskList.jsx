import { useContext } from "react";
import CategorysContext from "../contextes/CategorysContext";
import TasksContext from "../contextes/TasksContext";
import Task from "./Task";


const TaskList = () => {

    const {tasks} = useContext(TasksContext);
    const {category} = useContext(CategorysContext)

    const filteredTasks = tasks
    .filter(task => {
        switch (category) {
            case "défi":
                return task.isDefi == true
                break;

            case "fait":
                return task.isCompleted == true
                break;

            case "non fait":
                return task.isCompleted == false
                break;
        
            default:
                return task
                break;
        }
    } )

    return(
        <div className="task-list">
            {filteredTasks.length === 0 ? <p>AUCUNE TACHE</p> : (filteredTasks.map(task => <Task key={task.id} task={task}/> ))}
        </div>
    )
}

export default TaskList;