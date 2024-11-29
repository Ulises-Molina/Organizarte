import { DeleteOutlineOutlined } from "@mui/icons-material"
import { useContext, useState,useEffect} from "react";
import { TasksContext } from "../context/TasksContext";


export const Tasks = ({nombre,prioridad,deleteTask,id,key}) => {


    const {tasks,setTasks} = useContext(TasksContext);

    const [isChecked, setIsChecked] = useState(() => {
        const storedValue = localStorage.getItem(`isChecked-${id}`);
        return storedValue ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        localStorage.setItem(`isChecked-${id}`, JSON.stringify(isChecked));
    }, [isChecked, id]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setTasks(tasks.map(task => task.id === id ? {...task, check: isChecked} : task));
    };


    const prioridadClases = {
        Alta: "bg-red-100",
        Media: "bg-blue-100",
        Baja: "bg-green-100"
    };


    return (
        <>
        <main>
            <div className="flex flex-row gap-5 font-light my-2 items-center">
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="mt-1 hover:cursor-pointer"/>
                <div className="max-w-32 sm:max-w-3xl break-words">
                { isChecked ? <p className="line-through">{nombre}</p> : <p>{nombre}</p>}
                </div>
                <span className={`px-5 rounded-xl max-h-max ${prioridadClases[prioridad]}`}>{prioridad}</span>
                <DeleteOutlineOutlined className="cursor-pointer opacity-80" onClick={() => deleteTask(key)}/>
            </div>
        </main>
        </>
    )
}