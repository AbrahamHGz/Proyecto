import React from "react";
import Menu from "../Objetos/Menu";
const Home: React.FC = () => {
    return(
        <>
            <Menu></Menu>

            <div className="grid grid-cols-5 pt-23">
                <div className="bg-gray-800">
                    <h1 className="text-2xl text-white font-semibold flex justify-center p-3 my-3">
                        Top 10 Usuarios
                    </h1>
                    <ol className=" p-2">
                        <li className="flex justify-center">
                            <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                             hover:drop-shadow-xl hover:bg-gray-500">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" className="h-31 "/>
                                <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                            </button>   
                        </li>
                        <li className="flex justify-center">
                            <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                             hover:drop-shadow-xl hover:bg-gray-500">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" className="h-31 "/>
                                <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                            </button>   
                        </li>
                        <li className="flex justify-center">
                            <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                             hover:drop-shadow-xl hover:bg-gray-500">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" className="h-31 "/>
                                <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                            </button>   
                        </li>
                    </ol>
                </div>
                
                <div className="p-2 px-5 col-span-4">
                    <h1 className="text-4xl font-bold my-3 text-white">Arte Más Reciente</h1>

                    <form action="">
                        <label htmlFor="" className="text-lg text-slate-300 font-semibold">Categoria:</label>
                        <select name="" id="" className="bg-gray-200 rounded mx-2 p-1 px-2">
                            <option value="">paisajes llamativos</option>
                        </select>

                        <label htmlFor="" className="text-lg text-slate-300 font-semibold">Fecha</label>
                        <input type="date" className="bg-gray-200 rounded mx-2 p-1 px-2" />
                    </form>

                    <div id="Publicaciones" className="grid grid-cols-4 my-10">


                        <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84"/>
                            <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                            <p className="flex justify-start">"Por: Usuario 123"</p>
                        </button>

                        <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQQ5LVYvALNN0iVPlc62QtVhFTUPdwCm3MA&s" alt="" 
                            className="h-45 w-84"/>
                            <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                            <p className="flex justify-start">"Por: Usuario 123"</p>
                        </button>
                        <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <img src="https://ahoraeg.com/listas/wp-content/uploads/2024/06/Estas-son-las-Montanas-Mas-Altas-de-Asia.webp" alt="" className="h-45 w-84"/>
                            <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                            <p className="flex justify-start">"Por: Usuario 123"</p>
                        </button>

                        <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84"/>
                            <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                            <p className="flex justify-start">"Por: Usuario 123"</p>
                        </button>

                        <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQQ5LVYvALNN0iVPlc62QtVhFTUPdwCm3MA&s" alt="" 
                            className="h-45 w-84"/>
                            <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                            <p className="flex justify-start">"Por: Usuario 123"</p>
                        </button>
                        <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <img src="https://ahoraeg.com/listas/wp-content/uploads/2024/06/Estas-son-las-Montanas-Mas-Altas-de-Asia.webp" alt="" className="h-45 w-84"/>
                            <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                            <p className="flex justify-start">"Por: Usuario 123"</p>
                        </button>
                        

                      

                    </div>

                </div>

            </div>
        </>

        
    )
}

export default Home