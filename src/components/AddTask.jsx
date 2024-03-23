import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useContext, useState } from 'react';
import TasksContext from '../contextes/TasksContext';
import { MenuItem, Select } from "@mui/material";

export default function AddTask() {

  const{addTask, addNotif} = useContext(TasksContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [valueTitre, setValueTitre] = useState("");
  const [isDefi, setIsDefi] = useState("oui");
  const [valueHour, setValueHour] = useState("1");

  const onAddTask = (e) => {
    e.preventDefault();
    
    const task = {
        id : new Date().getTime(),
        titre: valueTitre, 
        created: new Date().toLocaleDateString(), 
        tempEcoulé: (isDefi === 'oui' ? 0:null),  
        isChronoPlayed: (isDefi === 'oui' ? false:null), 
        isCompleted : false,
        isDefi: (isDefi === 'oui' ? true:false), 
        timeDefi: (isDefi === 'oui' ? valueHour*3600 : null)
    }

    addTask(task);
    addNotif("add");
    setValueTitre("");
    setValueHour(1);
    handleClose();
  }

  return (
    <div>
      <button onClick={handleOpen} className="btn-open-task-form"><svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" ></path></svg></button>
      <Modal className='modal-task-form'
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box className="task-form">
                <form onSubmit={onAddTask}>
                    <h2 className='titre-form'>Ajouter une tâche </h2>
                    <input value={valueTitre}  onChange={(e) => setValueTitre(e.target.value) } className="input-add-task"  type="text" placeholder="tâche ......" required/>
          
                    <div className="defi">
                        <span className="text-defi">C'est un défi ? </span>
                        
                        <select onChange={(e)=>(setIsDefi(e.target.value))} value={isDefi} name="valueDefi">
                           <option value="oui">oui</option>
                           <option value="non">non</option>
                        </select>
                    </div>
                    
                    {isDefi === "oui" ? 
                    (<div className="defi-time">
                       <input value={valueHour} className={valueHour < 10 ? "input-hour":"input-hour-sup"} onChange={(e) => setValueHour(e.target.value)} min="1" type="number" name="valueHour" />
                        <span>{valueHour === "1" ? " heure" : " heures"}</span> 
                    </div>)
                    :
                    ("") }
                    
                    <div className="task-form-button">
                        <button className="btn-add"><svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor"></path></svg></button>
                    </div>  
                </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}