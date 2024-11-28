import {TasksContext} from "./TasksContext";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

export const TasksProvider = ({children}) => {

    const [task, setTask] = useState({
        name: "",
        priority: "Media",
        check: false,
        category: "Todas las categorias"
    });
    const [tasks, setTasks] = useState(()=>{
        const localTasks = localStorage.getItem("tasks");
        return localTasks ? JSON.parse(localTasks) : [];
    });
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(()=>{
        const localCategories = localStorage.getItem("categories");
        return localCategories ? JSON.parse(localCategories) : ["Todas las categorias","Trabajo","Estudio","Casa","Deporte"];
    });
    const [filter, setFilter] = useState("Todas las categorias");
    const [filterTasks, setFilterTasks] = useState(tasks);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    },[categories]);

    useEffect(() => {
        if(filter === "Todas las categorias"){
            setFilterTasks(tasks);
        }else{
            setFilterTasks(tasks.filter(task => task.category === filter));
        }
        console.log(tasks)
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
                priority: "Media",
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
    <TasksContext.Provider value={{task, error, change: handleChange, changePrioryty: handleChangePrioryty, add: addTask, tasks,setTasks, deleteTask, changeCategory,categories,setCategories,setFilterCategory,filterTasks,setFilterTasks}}>
        {children}
    </TasksContext.Provider>
)
}
