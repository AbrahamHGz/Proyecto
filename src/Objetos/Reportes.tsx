import React from "react";

const Reportes:React.FC = () =>{
    return(
        <>
            <h1 className="font-bold text-2xl">Reportes</h1>
            <form action="" className="lg:flex lg:items-center  space-x-4 py-4">
                <div>
                    <label htmlFor="">Correo:</label>
                    <input type="text" className="bg-slate-200  w-full mb-2 rounded p-1 px-2" placeholder="usuario@mail.com" />

                </div>
                
                <div>

                    <label htmlFor="">Desde:</label>
                    <input type="date" name="" id="" className="bg-slate-200  mb-2 rounded p-1" />
                </div>

                <div>
                    <label htmlFor="">Hasta:</label>
                    <input type="date" name="" id="" className="bg-slate-200 mb-2 rounded p-1"/>
                    
                </div>

                <input type="submit" value="Buscar" className="bg-slate-600 mb-2 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 " />
            </form>
           <div className="">
            <Report></Report>
            <Report></Report>
            <Report></Report>
            <Report></Report>

           </div>
        </>
    )
}

export default Reportes;

const Report:React.FC = () => {
    return(
        <>
          <div className="bg-slate-300 p-2 rounded mt-2">
            <div className="flex items-center space-x-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU" 
                alt="" className="size-20"/>
                <div>
                    <p className="font-bold text-xl">Usuario123</p>
                    <p>correo@mail.com</p>
                    <div className="flex">
                    <p className="font-semibold mr-2">Fecha de ingreso:</p> <p>08/03/2025</p>
                    </div>
                </div>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos nam sapiente ducimus earum ratione unde beatae? Saepe dolores adipisci ex. Sapiente repellendus officiis cumque perferendis quibusdam ratione necessitatibus earum nesciunt!</p>
            <a href="" className="text-blue-700 hover:underline hover:text-blue-900">Enlace</a>
            <form action="">
                <textarea name="" id="" className="w-full bg-slate-50 rounded border p-2" placeholder="Se ha revisado, gracias por su reporte."></textarea>
                <button className="bg-blue-800 p-2 rounded text-white font-bold  hover:bg-blue-700">Hecho</button>
            </form>
          </div>
        </>
    )
}