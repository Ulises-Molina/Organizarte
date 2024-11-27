import { DeleteOutlineOutlined } from "@mui/icons-material"



export const Tasks = ({nombre,prioridad,deleteTask,key}) => {

    const prioridadClases = {
        Alta: "bg-red-100",
        Normal: "bg-blue-100",
        Baja: "bg-green-100"
    };


    return (
        <>
        <main>
            <div className="flex flex-row gap-5 font-light my-2 items-center">
                <input type="checkbox" className="my-2"/>
                <div className="max-w-32 sm:max-w-3xl break-words">
                <p className="">{nombre}</p>
                </div>
                <span className={`px-5 rounded-xl max-h-max ${prioridadClases[prioridad]}`}>{prioridad}</span>
                <DeleteOutlineOutlined className="cursor-pointer opacity-80" onClick={() => deleteTask(key)}/>
            </div>
        </main>
        </>
    )
}