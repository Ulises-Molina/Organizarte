import {TasksContext} from "./TasksContext";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

export const TasksProvider = ({children}) => {

    const [task, setTask] = useState({
        name: "",
        priority: "Normal",
        check: false,
        category: "Todas las categorias"
    });
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(["Todas las categorias","Trabajo","Estudio","Casa","Deporte"]);
    const [filter, setFilter] = useState("Todas las categorias");
    const [filterTasks, setFilterTasks] = useState(tasks);

    useEffect(() => {
        if(filter === "Todas las categorias"){
            setFilterTasks(tasks);
        }else{
            setFilterTasks(tasks.filter(task => task.category === filter));
        }
    },[filter,tasks]);

    const handleChange = (e) => {
        const newTask = e.target.value;
        setTask((prevState) => ({
            ...prevState,
            name: newTask,
            }));
    }

    const handleChangePrioryty = (e) => {
        const priority= e.target.value;
        setTask((prevState) => ({
            ...prevState,
            priority: priority,
            }));
        
    }


    const addTask = (e) =>{
        e.preventDefault();
        if (task.name.trim().length > 3) {
            setTasks([...tasks, {...task, id: uuidv4()}]);
            setTask((prevState) => ({
                name: "",
                priority: "Normal",
                check: false,
                category: prevState.category,
            }));
        setError(false);
        }else{
            setError(true);
        }
    }
    
    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }


    const changeCategory = (e) => {
        const category = e.target.value;
        setTask((prevState) => ({
            ...prevState,
            category: category,
            }));
    }

    const setFilterCategory = (category) => {
        setFilter(category);
        if(category === "Todas las categorias"){
            setFilterTasks(tasks)
    }
        else{
        setFilterTasks(tasks.filter(task => task.category === filter));
    }}



return (
    <TasksContext.Provider value={{task, error, change: handleChange, changePrioryty: handleChangePrioryty, add: addTask, tasks, deleteTask, changeCategory,categories,setCategories,setFilterCategory,filterTasks}}>
        {children}
    </TasksContext.Provider>
)
}
