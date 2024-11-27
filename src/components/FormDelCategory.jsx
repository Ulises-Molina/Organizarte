import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"
import { useState } from "react";

export const FormDelCategory = ({unShow}) => {

    const {setCategories,categories} = useContext(TasksContext);
    const [categoryToDelete, setCategoryToDelete] = useState("")

    const handleCategory = (e) => {
        const category = e.target.value;
        setCategoryToDelete(category)
    }

    const deleteCategory = (e) => {
        e.preventDefault();
        setCategories(categories.filter(category => category !== categoryToDelete));
        unShow();
    }

    return (
        <div className="flex justify-center items-center">
            <div className="p-6 border border-gray-400 rounded w-fit flex flex-col gap-5"><p className="text-center text-lg mb-5">Eliminar categoria</p>
        <form onSubmit={deleteCategory}>
        <div className="flex relative w-full ml-2">
        <label className="font-light absolute -top-7">Categoria</label>
                <select onChange={(e) => handleCategory(e)} className="bg-sidebar rounded p-1 font-light min-w-48">
                    {categories.map((category) => (<option key={category} value={category} className="font-light">{category}</option>))}
                </select>
        </div>
        <div className="flex mt-10 mx-2 justify-between gap-10">
            <button className="bg-sidebar rounded p-1 px-2 text-gray-700 shadow-lg hover:bg-gray-400 transition-colors duration-400" onClick={unShow}>Cancelar</button>
            <button type="submit" className="bg-sidebar rounded p-1 px-2 text-gray-700 shadow-lg hover:bg-gray-400 transition-colors duration-400">Eliminar categoria</button>
        </div>
        </form>
    </div>
        </div>
    )
}
