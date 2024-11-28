import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"

export const Inputs = () =>  {

    const {task, error, change, add, changePrioryty,changeCategory,categories} = useContext(TasksContext);

    return (
        <>
        <form id="form" className="flex flex-col gap-7 mb-8 w-full items-center md:flex-row" onSubmit={(e) => add(e)}>
            <div className="flex relative">
                <label className="font-light absolute -top-7">Prioridad de tarea</label>
                <select onChange={(e) => changePrioryty(e)} value={task.priority} className="bg-sidebar rounded p-1 font-light min-w-48">
                    <option value="Media" className="font-light">Media</option>
                    <option value="Alta" className="font-light">Alta</option>
                    <option value="Baja" className="font-light">Baja</option>
                </select>
            </div>
            <div className="flex relative">
                <label className="font-light absolute -top-7">Categoria</label>
                <select onChange={(e) => changeCategory(e)} value={task.category} className="bg-sidebar rounded p-1 font-light min-w-48">
                    {categories.map((category) => (<option key={category} value={category} className="font-light">{category}</option>))}
                </select>
                
            </div>
            <div className="flex relative w-full">
            <input value={task.name} type="text" placeholder="Ingresa aqui la nueva tarea" className="bg-sidebar rounded w-96 p-1 mx-2 px-5 shadow-lg" onChange={(e) => change(e)}/>
            {
                error ? <p className="text-red-500 font-light absolute -top-7 left-3">La tarea debe tener mas de 3 caracteres</p> : null
            }
            </div>
        </form>
        </>
    )
}
