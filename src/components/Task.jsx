import { useContext, useEffect, useState } from "react";
import TasksContext from "../contextes/TasksContext";
import afficherHeure from "../fonction/afficherHeure";
import calculNiveau from "../fonction/calculNiveau";

const Task = ({task}) => {

    const {playChrono, pauseChrono, updateTask, stopChrono, deleteTask, addNotif} = useContext(TasksContext);

    const [intervalle, setIntervalle] = useState(0);
    const [isClickedDelete, setIsClickedDelete] = useState(false)

    useEffect(()=>{
        if (task.isDefi && task.isCompleted){
            addNotif("défi-terminé");
        }
        else if(task.isCompleted){
            addNotif("tâche-fini")
        }
        else if (task.isDefi){
            if (task.tempEcoulé === task.timeDefi) {
                stopChrono(task.id);
                clearInterval(intervalle);
            }
        }
        
       
    }, [task.isDefi, task.tempEcoulé, task.isCompleted])    

    const onPlayChrono = (id) => {
        const intervalId = setInterval(() => {
           playChrono(id);
        }, 1000);
        setIntervalle(intervalId);
    }

    const onPauseChrono = (id) => {
        clearInterval(intervalle)
        pauseChrono(id);
    }

    const onUpdate = (e) => {
        clearInterval(intervalle);
        updateTask(task.id)({isCompleted:e.target.checked});
    }

    const onDeleteTask = (id) => {
        clearInterval(intervalle);
        deleteTask(id);
        addNotif("delete");
    }
    
    return(<div className="task-item ">
            <div className={isClickedDelete ? 'task-item-info isClickedDeleted':'task-item-info'}>
                <div className="task-head">
                    <div className="task-name-niveau">
                        <input disabled={task.isDefi && task.isCompleted ? true:false}  checked={task.isCompleted} onChange={onUpdate} className="input-check-task" type="checkbox" name="task"/>
                        <span className="task-titre">{task.titre}</span>
                        {task.isDefi ? (
                        <div className="task-box-niveau">
                            <div style={{width:calculNiveau(task.timeDefi, task.tempEcoulé)+"px"} } className="task-niveau"></div>                        
                        </div>) : ("")}
                        
                        {task.isDefi ? (<i className="task-titre-defi">(Défi {task.timeDefi/3600} {task.timeDefi === 3600 ? "heure":"heures"})</i>):("")}
                        
                    </div>
                    <div className="delete-info">
                        {isClickedDelete ? 
                        (
                           
                            <div className="delete-question">
                                <p className="delete-question-text">êtes vous sur ? </p>
                                <button onClick={() => onDeleteTask(task.id)} className="btn-delete-yes">oui</button>
                                <button onClick={() => setIsClickedDelete(false)} className="btn-delete-no">non</button>
                            </div>
                        )
                        :
                        (<button className="btn-delete-task" onClick={() => setIsClickedDelete(true)}><svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor"></path></svg></button>)}                      
                    </div>             
                </div>
            
                <div className="task-action">
                    <div className="action-left">
                        {task.isChronoPlayed && !task.isCompleted ? 
                            (<div className="loading">
                                <div className="ball ball-1"></div>
                                <div className="ball ball-2"></div>
                                <div className="ball ball-3"></div>
                                <div className="text-en-cours">défi en cours</div>
                            </div>) 
                            : 
                            (<div>
                                <div className="task-date">{task.created}</div>
                            </div>)
                        }
                        {/* <div>
                                <div className="task-date">{task.created}</div>
                            </div> */}
                    </div>
                    
                    <div className="action-right">
                       
                        {task.isDefi && !task.isCompleted ? 
                            (<div className="chrono">
                                
                                     {task.isChronoPlayed ? 
                                    (<button onClick={() => onPauseChrono(task.id)} className="btn-pause"><svg width="15" height="15" viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg"><path d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z" fill="currentColor"></path></svg></button>)
                                    :
                                    (<button onClick={() => onPlayChrono(task.id)} className="btn-play"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor"></path></svg></button>)
                                    }
                               
                               
                                <div className="temp-ecoulé">{afficherHeure(task.tempEcoulé)}</div>
                            </div>)
                            :
                            ("")
                        }
                    </div>
                </div>          
            </div>
        </div>
    )
}

export default Task;