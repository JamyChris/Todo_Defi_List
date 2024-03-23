import TaskList from "./TaskList";
import TaskTopBar from "./TaskTopBar";
import { useState } from "react";
import CategorysContext from "../contextes/CategorysContext";

const BoxTask = ({tasks}) => {

    const [category, setCategory] = useState("défi");

    const handleChangeCategory = (categoryName) => {
        setCategory(categoryName)
    }

    return(
        <CategorysContext.Provider value={{category, changeCategory:handleChangeCategory}}>
            <div>
                <h1 className="box-view-task-titre">Mes tâches</h1>
                <div className="box-view-task">
                    <TaskTopBar />
                    <TaskList />
                </div>
            </div>
        </CategorysContext.Provider>
    )
}



export default BoxTask;