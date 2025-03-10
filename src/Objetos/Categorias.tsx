import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Enero", ventas: 400 },
  { name: "Febrero", ventas: 300 },
  { name: "Marzo", ventas: 500 },
  { name: "Abril", ventas: 700 },
  { name: "Mayo", ventas: 600 },
  { name: "Febrero", ventas: 300 },
  { name: "Marzo", ventas: 500 },
  { name: "Abril", ventas: 700 },
  { name: "Mayo", ventas: 600 },
];

const Categorias: React.FC = () =>{
    return(
        <>
            <h1 className="font-bold text-2xl">Categorias</h1>
            <form action="" className="flex items-center justify-center space-x-4 py-4">
                <label htmlFor="">Desde:</label>
                <input type="date" name="" id="" className="bg-slate-200 rounded p-1" />


                <label htmlFor="">Hasta:</label>
                <input type="date" name="" id="" className="bg-slate-200 rounded p-1"/>

                <input type="submit" value="Buscar" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 " />
            </form>

            <form action="">
                <h1 className="font-semibold text-xl">Crear Categoria</h1>
                
                <input type="text" className="bg-slate-200 rounded w-96 px-2 p-1" />
                <input type="submit" value="Buscar" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 ml-2 " />
            </form>

            <div className="grid grid-cols-5">
                <Categori></Categori>
                <Categori></Categori>
                <Categori></Categori>
                <Categori></Categori>
                <Categori></Categori>
                <Categori></Categori>

            </div>
        </>
    )
}

export default Categorias;

const Categori: React.FC = () =>{
    return (
        <>
            <div className="bg-slate-300 rounded p-4 my-2 mx-2">
                <h1 className="flex justify-center text-2xl font-bold">Arte</h1>
                <div className="">
                    <p className="font-semibold">Creado por:</p><p>usuario1233</p>
                </div>
                <div className="">
                    <p className="font-semibold">Fecha de creacion:</p> <p>08/03/2025</p>
                </div>
                <button className="w-full hover:bg-red-400 bg-red-500 rounded p-2 font-bold text-white ">Desactivar</button>
                <button className="w-full hover:bg-slate-400 bg-slate-500 rounded p-2 font-bold text-white ">Reactivar</button>

            </div>

        </>
    )
}