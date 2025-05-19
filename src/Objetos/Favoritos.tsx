import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriaSelect from "./CategoriaSelect";
import { I_Favorito } from "../interfaces/I_Favorito";
import { obtenerFavoritosUsuario } from "../services/apiFavoritos";
import { I_Usuario } from "../interfaces/usuario";

interface UsuarioProps {usuario_i: I_Usuario;}

const Favoritos: React.FC<UsuarioProps> = ({ usuario_i }) => {
  const [categoria, setCategoria] = useState<string>("");
  const [favoritos, setFavoritos] = useState<I_Favorito[]>([]);

  const fetchFavoritos = async () => {
    try { const data = await obtenerFavoritosUsuario(usuario_i._id);
      setFavoritos(data); } catch (error) {
      console.error("Error al obtener los favoritos:", error); } };

  useEffect(() => {
    if (usuario_i._id) { fetchFavoritos(); } }, [usuario_i._id]);

  return (
    <> <div className="items-center space-x-5 mb-4">
        <h1 className="text-2xl font-semibold">Favoritos</h1>

         {/*  <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Categoría:</label>
            <br />
            <CategoriaSelect value={categoria} onChange={setCategoria} />
          </div>

    
          {/* <div> <label className="font-semibold">Desde:</label>    <br />  <input type="date" className="bg-white rounded px-2" />   </div>
          <div>
            <label className="font-semibold">Hasta:</label>
            <br />
            <input type="date" className="bg-white rounded px-2" />
          </div>
        </div>

        <button
          className="mt-2 p-2 bg-slate-800 rounded hover:bg-slate-700 font-bold text-white"
          onClick={e => e.preventDefault()}> Filtrar  
        </button >*/}

        
      </div>

      <div className="grid md:grid-cols-4 grid-cols-3">
        {favoritos
          .filter( fav => fav.FAVpublicacion != null && fav.FAVpublicacion.PUBusuario != null)
          .map((fav, index) => ( <PublicaUsuFav key={index} P_favorito={fav} /> ))}
      </div> </> ); };

export default Favoritos;

interface P_FavoritoProps { P_favorito: I_Favorito; }

const PublicaUsuFav: React.FC<P_FavoritoProps> = ({ P_favorito }) => { const pub = P_favorito.FAVpublicacion;
  if (!pub) return null;

  const {
    _id,
    PUBimagen = "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp",
    PUBnombre = "Sin título",
    PUBusuario,
  } = pub;

  const usuarioNombre = PUBusuario?.nombre || "Desconocido";

  return (
    <Link
      to={`/Publicacion/${_id}`}
      className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded hover:drop-shadow-xl hover:bg-gray-500"
    >
      <img
        src={PUBimagen}
        alt={PUBnombre}
        className="md:h-45 w-84 object-cover rounded"
      />
      <p className="flex justify-center text-lg font-bold mt-2">
        {PUBnombre}
      </p>
      <p className="flex justify-center text-lg">Por: {usuarioNombre}</p>
      <svg
        className="size-10 hover:text-gray-800 ms-1 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    </Link>
  );
};
