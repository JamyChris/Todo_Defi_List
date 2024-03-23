import { useContext } from "react";
import CategorysContext from "../contextes/CategorysContext";

const TaskCategory = () => {    

    const {category, changeCategory} = useContext(CategorysContext);

    return(
            <div className="task-category">
                <span onClick={() => changeCategory("tout")} className={category === 'tout' ? 'isActive': ''}>Tout</span>
                <span onClick={() => changeCategory("défi")} className={category === 'défi' ? 'isActive': ''}>Défis</span>
                <span onClick={() => changeCategory("fait")} className={category === 'fait' ? 'isActive': ''}>Fait</span>
                <span onClick={() => changeCategory("non fait")} className={category === 'non fait' ? 'isActive': ''}>Non fait</span>
            </div> 
    )
}

export default TaskCategory;