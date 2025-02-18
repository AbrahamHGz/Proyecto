import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Objetos/Menu";

const Publicacion: React.FC = () => {
    return(
        <>
            <Menu></Menu>
            <div className="rounded bg-gray-300 p-4">
                 <div className="pt-26 px-30">
                <div className=" w-full flex bg-gray-400 justify-center p-5">
                    <img src="https://ahoraeg.com/listas/wp-content/uploads/2024/06/Estas-son-las-Montanas-Mas-Altas-de-Asia.webp"
                     alt="" className="rounded my-2 h-96"/>
                </div>

                <div className="flex bg-gray-500">
                    <img src="" alt="" />
                    <div className="p-4 text-white">
                        <p className="text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores quibusdam, praesentium id quia odit ducimus? Illo omnis sint, vitae dolore, velit cupiditate rerum nesciunt beatae, eaque at iusto tenetur eveniet.</p>
                        <p><strong className="">Fecha:</strong> </p>
                    </div>
                </div>

            </div>
            </div>
        </>
    )
}

export default Publicacion;