import { useContext, useEffect, useState } from "react";
import TasksContext from "../contextes/TasksContext";

const Notif = () => {
    const {isNotif, message, quitNotif} = useContext(TasksContext);
    // const [temp, setTemp] =  useState()

    useEffect(() => {
        if (isNotif){
            const timeOutId = setTimeout(() => {
                quitNotif();
            }, 5000);
        }  
    }, [isNotif]);
    return (
    <div>
        {isNotif ? 
        (<div className="notif">
            <span>{message}</span> 
        </div>)
        :
        ("")}
    </div>
     
    )
}
 
export default Notif;