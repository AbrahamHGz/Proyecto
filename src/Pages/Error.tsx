
import React from "react";
import { Link } from "react-router-dom";

const WarningAlert: React.FC = () => {
  return (
  <div className="mx-40 bg-red-50 rounded-lg p-6 mt-10 shadow-inner flex items-start space-x-4">
  <svg  xmlns="http://www.w3.org/2000/svg"
     className="w-10 h-10 text-red-600"
     viewBox="0 0 20 20"
     fill="currentColor">

     <path
     fillRule="evenodd"
     d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.746 1.33-.213 2.99-1.742 2.99H3.481c-1.53 0-2.488-1.66-1.742-2.99L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z"
     clipRule="evenodd" />
     </svg>

     <div>
     <p className="text-red-800 font-semibold text-2xl mb-2">
     ¡Advertencia! </p>
     <p className="text-red-700 mb-4">
     Ha ocurrido un error. Pantalla no Cargada. </p>
     <Link to="/perfil"
     className="inline-block px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition" >
     Aceptar </Link> </div>
    </div> );};

export default WarningAlert;