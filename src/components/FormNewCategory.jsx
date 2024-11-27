import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"
import { useState } from "react"

export const FormNewCategory = ({unShow}) => { 

    const [newCategory, setNewCategory] = useState("")
    const {setCategories,categories} = useContext(TasksContext);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);

    const handleInput = (e) => {
        const newCategory = e.target.value;
        setNewCategory(newCategory);
        if(error && newCategory.trim().length > 5 && newCategory.trim().length < 15){
            setError(false);
        }
        if (error2 && !categories.includes(newCategory)) {
            setError2(false);
        }
    }

    const sendForm = (e) => {
        e.preventDefault();
        if (newCategory.trim().length < 5 || newCategory.trim().length > 15){
            setError(true);
            return
        }
        if (categories.some(category => category.toLowerCase() === newCategory.toLowerCase())) {
            setError2(true);
            return;
        }
        else {
            setCategories([...categories,newCategory]);
            setNewCategory("");
            unShow();
            
        }
    }

    return (
    <div className="w-full flex items-center justify-center">
        <div className="p-6 border border-gray-400 rounded w-fit flex flex-col gap-5">
    <p className="text-center mb-5 text-xl">Nueva categoria</p>
    <form onSubmit={sendForm}>
    <div className="flex relative w-full">
        <input value={newCategory} onChange={handleInput} type="text" placeholder="Ingresa aqui la nueva categoria" className="bg-sidebar rounded w-64 md:w-96 p-1 mx-2 px-5 shadow-lg"/>
        {
            error ? <p className="text-red-500 font-light absolute -top-7 left-3">La tarea debe tener entre 5 y 15 caracteres</p> : 
            error2 ? <p className="text-red-500 font-light absolute -top-7 left-3">La categoria ya existe</p> : null
        }
    </div>
    <div className="flex mt-10 mx-2 justify-between">
        <button type="button" className="bg-sidebar rounded p-1 px-2 text-gray-700 shadow-lg hover:bg-gray-400 transition-colors duration-400" onClick={unShow}>Cancelar</button>
        <button type="submit" className="bg-sidebar rounded p-1 px-2 text-gray-700 shadow-lg hover:bg-gray-400 transition-colors duration-400">Agregar categoria</button>
    </div>
    </form>
</div></div>
    )
}