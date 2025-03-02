import React  from "react";

const UsuariosAd: React.FC = () => {
    return(
        <>
        <h1 className=" font-semibold text-2xl">Usuarios</h1>
            <form action="" className="flex items-center justify-center space-x-4 py-4">
                <input type="text" className="bg-slate-200 w-96 rounded p-1 px-2" placeholder="Usuario" />
                
                <label htmlFor="">Desde:</label>
                <input type="date" name="" id="" className="bg-slate-200 rounded p-1" />


                <label htmlFor="">Hasta:</label>
                <input type="date" name="" id="" className="bg-slate-200 rounded p-1"/>

                <input type="submit" value="Buscar" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-200 hover:text-black" />
            </form>

            <div className="grid grid-cols-4 ">
                <Usaurioss></Usaurioss>
                <Usaurioss></Usaurioss>
                <Usaurioss></Usaurioss>
                <Usaurioss></Usaurioss>
                <Usaurioss></Usaurioss>


            </div>

        </>
    )
}

export default UsuariosAd;

const Usaurioss: React.FC = () => {
    return(
        <>
            <div className="bg-slate-300 rounded p-4 mx-2 my-2 ">
                <div className=" space-x-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
                     alt="" className="w-full h-40" />
                     <div>
                        <h1 className="font-bold text-2xl">Usuario123</h1>
                        <h1 className="font-semibold text-lg">Usuario@mail.com</h1>
                     </div>
                    <button className="w-full hover:bg-red-200 bg-red-500 rounded p-2 font-bold text-white hover:text-black">Desactivar</button>
                    <button className="w-full hover:bg-green-200 bg-green-500 rounded p-2 font-bold text-white hover:text-black">Reactivar</button>

                     
                </div>
            </div>
        </>
    )
}