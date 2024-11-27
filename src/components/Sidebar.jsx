import { useContext } from "react"
import { useState } from "react";
import { TasksContext } from "../context/TasksContext"

export const Sidebar = ({addCategory,delCategory,unShow,unShowDel}) => {

    const {categories,tasks,setFilterCategory} = useContext(TasksContext);
    const [selectedCategory, setSelectedCategory] = useState("Todas las categorias");

    const tasksNumber = (category) => {
        if(category === "Todas las categorias") {
            return tasks.length
        } else {
            return tasks.filter(task => task.category === category).length
        }
    }

    const addBg = (category) => {
        setSelectedCategory(category);
    }

    return (
    <aside id="sidebar" className="absolute top-0 left-0 w-full bg-sidebar transform -translate-y-full opacity-0 transition-all duration-500 ease-in-out md:relative md:translate-y-0 md:opacity-100 md:w-1/5">
        <h1 className="hidden md:block text-center my-10 font-sans text-2xl font-bold hover:cursor-pointer"
        onClick={()=> {
            unShow();
            unShowDel()
        }}>Organizarte</h1>
        <h2 className="hidden md:block text-center my-10 text-lg">Categorias</h2>
        <ul className="flex flex-col w-full items-center">
            {categories.map((category) => (<li id="category" key={category}  className={`hover:bg-gray-500 hover:text-gray-300 cursor-pointer py-3  transition-all duration-500 ease-in-out flex flex-row w-full items-center pl-5 rounded ${selectedCategory === category ? "bg-gray-500 text-gray-300" : ""}`} onClick={() => {
    setFilterCategory(category);
    addBg(category);
}}>
                <p className="mr-5">{category}</p>
                {<div className="bg-gray-500 rounded-full w-7 h-7 text-center absolute right-6 md:hidden lg:block">{tasksNumber(category)}</div>}
            </li>))}
        </ul>
        <p className="text-center opacity-50 mt-5 hover:cursor-pointer hover:opacity-70" 
        onClick={
            addCategory 
        }
        >Agregar categoria</p>
        <p className="text-center opacity-50 mt-5 mb-5 hover:cursor-pointer hover:opacity-70" onClick={delCategory}>Eliminar Categoria</p>
    </aside>
    )
}


//TODO : GUARDAR EN CACHE LOS DATOS DE LAS CATEGORIAS Y TAREAS