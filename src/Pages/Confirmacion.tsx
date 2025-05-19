import React from "react";
import { Link } from "react-router-dom";

const Confirmacion: React.FC = () => {
  return (
    <div className="mx-40 bg-blue-100 rounded-lg p-6 mt-10 shadow-md">
    <p className="text-blue-800 font-semibold text-2xl text-center mb-6">
    ¿Estás seguro que quieres proceder con esta acción? </p>

    <div className="flex justify-center space-x-4">
    <button className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition">
    Sí, continuar </button>

    <Link to="/Main"
     className="px-8 py-2 bg-gray-500 hover:bg-gray-400 text-white font-bold rounded-lg transition">
    No, regresar </Link>
    </div>
    </div>
  );};

export default Confirmacion;
