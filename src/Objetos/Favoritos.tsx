import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriaSelect from "./CategoriaSelect";

import { I_Favorito } from "../interfaces/I_Favorito";
import { obtenerFavoritosUsuario } from "../services/apiFavoritos";
import { I_Usuario } from "../interfaces/usuario";

interface usuarioProps {
    usuario_i: I_Usuario
}
const Favoritos: React.FC<usuarioProps> = ({ usuario_i }) => {
    const [categoria, setCategoria] = useState('');
    const [favoritos, setFavoritos] = useState<I_Favorito[]>([])

    const fetchPublicacion = async () => {
        try {
            const data = await obtenerFavoritosUsuario(usuario_i._id);
            setFavoritos(data);
        } catch (error) {
            console.error("Error al obtener los favoritos:", error);
        }
    }

    useEffect(() => {
        fetchPublicacion();
    }, [usuario_i._id])
    return (
        <>
            <div className=" items-center space-x-5 mb-4">
                <h1 className="text-2xl font-semibold">Favoritos</h1>

                <div className="grid md:grid-cols-3">

                    <div>
                        <label htmlFor="" className="">Categoria: </label>
                        <br />
                        <CategoriaSelect value={categoria} onChange={setCategoria} />
                    </div>

                    <div>
                        <label htmlFor="">Desde:</label>
                        <br />
                        <input type="date" className="bg-white rounded px-2" />
                    </div>

                    <div>
                        <label htmlFor="">Hasta:</label>
                        <br />
                        <input type="date" className="bg-white rounded px-2" />

                    </div>

                </div>
                <button className="mt-2 p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Filtrar</button>
            </div>

            <div className="grid md:grid-cols-4 grid-cols-3">
                {favoritos.map((fav, index) => (
                    <PublicaUsuFav key={index} P_favorito={fav}></PublicaUsuFav>
                ))}

            </div>

        </>
    )
}

export default Favoritos;

interface P_Favortio{
    P_favorito:I_Favorito
}
const PublicaUsuFav: React.FC<P_Favortio> = ({P_favorito}) => {
    return (
        <>
            <Link to={`/Publicacion/${P_favorito.FAVpublicacion._id}`} className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
             hover:drop-shadow-xl hover:bg-gray-500">
                <img src={P_favorito?.FAVpublicacion.PUBimagen || "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"}
                 alt=""
                    className="md:h-45 w-84" />
                <p className="flex justify-center text-lg font-bold">{P_favorito?.FAVpublicacion.PUBnombre}</p>
                <p className="flex justify-center text-lg ">Por: {P_favorito?.FAVusuario.nombre}</p>

                <svg className="size-10 hover:text-gray-800  ms-1 text-yellow-300  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>

            </Link>
        </>
    )
}