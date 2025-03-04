import React from "react";

const Favoritos: React.FC = () => {
    return (
        <>
            <div className="flex items-center space-x-5 mb-4">
                <h1 className="text-2xl font-semibold">Favoritos</h1>

                <label htmlFor="" className="">Categoria</label>
                <select name="" className="bg-white rounded px-2" id="">
                    <option value="">Prueba de categoria</option>
                </select>

                <label htmlFor="">Desde:</label>
                <input type="date" className="bg-white rounded px-2" />

                <label htmlFor="">Hasta:</label>
                <input type="date" className="bg-white rounded px-2" />

            </div>

            <div className="grid grid-cols-4">
                <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                        hover:drop-shadow-xl hover:bg-gray-500">
                    <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84" />
                    <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                    <p className="flex justify-start">"Por: Usuario 123"</p>
                </button>
                <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                        hover:drop-shadow-xl hover:bg-gray-500">
                    <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84" />
                    <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                    <p className="flex justify-start">"Por: Usuario 123"</p>
                </button>
                <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                        hover:drop-shadow-xl hover:bg-gray-500">
                    <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84" />
                    <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                    <p className="flex justify-start">"Por: Usuario 123"</p>
                </button>
                <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                        hover:drop-shadow-xl hover:bg-gray-500">
                    <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84" />
                    <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                    <p className="flex justify-start">"Por: Usuario 123"</p>
                </button>
                <button className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                        hover:drop-shadow-xl hover:bg-gray-500">
                    <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" className="h-45 w-84" />
                    <p className="flex justify-center text-lg font-bold">"Arte de ejemplo"</p>
                    <p className="flex justify-start">"Por: Usuario 123"</p>
                </button>

            </div>

        </>
    )
}

export default Favoritos;