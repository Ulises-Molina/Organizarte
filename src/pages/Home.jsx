import { Inputs } from "../components/Inputs"
import { Tasks } from "../components/Tasks";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useContext, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import { FormNewCategory } from "../components/FormNewCategory";
import { FormDelCategory } from "../components/FormDelCategory";
import { InputSearch } from "../components/InputSearch";


export const Home = () => {

    const {deleteTask,filterTasks} = useContext(TasksContext);
    const [formNewCategory, setFormNewCategory] = useState(false);
    const [formDelCategory, setFormDelCategory] = useState(false);
    const [search, setSearch] = useState('');


    const openMenu = () => {
        const sidebar = document.getElementById('sidebar');
        const contenedor = document.getElementById('contenedor');
        if (sidebar.classList.contains('-translate-y-full')) {
            sidebar.classList.remove('-translate-y-full', 'opacity-0');
            sidebar.classList.add('translate-y-14', 'opacity-100');
            contenedor.classList.add('hidden');
            } else {
            sidebar.classList.add('-translate-y-full', 'opacity-0');
            sidebar.classList.remove('translate-y-14', 'opacity-100');
            contenedor.classList.remove('hidden');
            }
    }

    const closeMenu = () => {
        const sidebar = document.getElementById('sidebar');
        const contenedor = document.getElementById('contenedor');
        sidebar.classList.add('-translate-y-full', 'opacity-0');
        sidebar.classList.remove('translate-y-14', 'opacity-100');
        contenedor.classList.remove('hidden');
    }

    const showForm = () => {
        setFormNewCategory(true);
        setFormDelCategory(false);
        closeMenu();
    }
    const unshowForm = () => {
        setFormNewCategory(false);
        setFormDelCategory(false);
    }

    const showFormDel = () => {
        setFormDelCategory(true);
        setFormNewCategory(false);
        closeMenu();
    }
    const unshowFormDel = () => {
        setFormDelCategory(false);
        setFormNewCategory(false);
    }

    const priorityOrder = {
        Alta: 1,
        Media: 2,
        Baja: 3
    }

    const tasks = filterTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]).filter(task => task.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
        <Header openMenu={openMenu}></Header>
        <div className="md:flex md:flex-row w-full">
        <Sidebar unShow={unshowForm} unShowDel={unshowFormDel} addCategory={showForm} delCategory={showFormDel}></Sidebar>
        <main id="contenedor" className="w-screen min-h-screen flex flex-col bg-white p-5 py-24 md:py-20 transition-all duration-500 ease-in-out md:ml-10 transform md:translate-y-0">
        {formNewCategory ?
        <FormNewCategory unShow={unshowForm} show={showForm}></FormNewCategory> :
        formDelCategory ?
        <FormDelCategory unShow={unshowFormDel} show={showFormDel}></FormDelCategory> :
        <>
        <InputSearch search={setSearch}/>
        <Inputs/>
            {
                tasks.map((task, index) => (
                    <Tasks key={task.id} index={index} id={task.id} nombre={task.name} prioridad={task.priority} deleteTask={()=> deleteTask(task.id)}/>
                    
                ))
            }
        </>
        }       
        </main>
        </div>
        </>
    )
}
