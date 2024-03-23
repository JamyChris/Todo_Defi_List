import TaskCategory from "./TaskCategory";
import AddTask from "./AddTask";

const TaskTopBar = () => {
    return(
        <div className="top-bar-task">
            <TaskCategory />
            <AddTask />
        </div>
    )
}

export default TaskTopBar;