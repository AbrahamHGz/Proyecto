import React from "react";

const Reportes:React.FC = () =>{
    return(
        <>
            <h1 className="font-bold text-2xl">Reportes</h1>
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
                </div>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos nam sapiente ducimus earum ratione unde beatae? Saepe dolores adipisci ex. Sapiente repellendus officiis cumque perferendis quibusdam ratione necessitatibus earum nesciunt!</p>
            <a href="" className="text-blue-700 hover:underline hover:text-blue-900">Enlace</a>
            <form action="">
                <textarea name="" id="" className="w-full bg-slate-50 rounded border p-2"></textarea>
                <button className="bg-green-400 p-2 rounded text-white font-bold hover:text-black hover:bg-green-100">Hecho</button>
            </form>
          </div>
        </>
    )
}