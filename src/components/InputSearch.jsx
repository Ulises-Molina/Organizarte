

export const InputSearch = ({search}) => {

    const handleChange = (e) => {
        const newSearch = e.target.value;
        search(newSearch.trim());
    }



    return (
        <>
        <label className="hidden lg:block absolute right-[420px] font-light top-[30%]">Buscar tarea</label>
        <input type="text" placeholder="Encontra tu tarea" className="bg-sidebar hidden lg:block rounded w-96 p-1 mx-2 px-5 shadow-lg absolute right-28 top-1/3" onChange={(e) => handleChange(e)}/>
        </>
    )
}
