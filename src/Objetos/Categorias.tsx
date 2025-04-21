import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {Link, useNavigate} from "react-router-dom";
import { crearCategoria, obtenerCategoriasDetallada } from "../services/apiCategoria";
import { Categoria } from "../interfaces/categoria";

const Categorias: React.FC = () =>{
    //Crear una categoria
    const navigate = useNavigate();
    const [CATnombre, setCATnombre] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
        if(usuarioInfo?.email){
          setEmail(usuarioInfo.email || null)
        }
    }, [])

    const handleCATnombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const value = e.target.value;
         setCATnombre(value);
     };
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{

            await crearCategoria(CATnombre, email);
            alert("Categoria creada con exito");
            setEmail("");
            setCATnombre("");
            // navigate('/Administrador');
            fetchCategorias();
        }catch(error: any){
            if(error.response && error.response.data && error.response.data.error){
                alert(`Error: ${error.response.data.error}`)
            }else{
                alert("Error inesperado al crear la categoria");
            }
        }
    }


    //Mostrar las categorias con informacion detallada
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const fetchCategorias = async () => {
        try{
            const data = await obtenerCategoriasDetallada();
            setCategorias(data);
        }catch(error){
            console.error("Error al obtener categorías:", error);
        }
    }
    useEffect(() => {

        fetchCategorias();
    }, []);


    return(
        <>
            <h1 className="font-bold text-2xl">Categorias</h1>
            <form  action="" className="lg:flex items-center lg:justify-center space-x-4 py-4">
                <label htmlFor="">Desde:</label>
                <input type="date" name="" id="" className="bg-slate-200 rounded p-1" />


                <label htmlFor="">Hasta:</label>
                <input type="date" name="" id="" className="bg-slate-200 rounded p-1 mb-2 lg:mb-0"/>

                <input type="submit" value="Buscar" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 " />
            </form>

            <form action="/Administrador"  onSubmit={handleSubmit}>
                <h1 className="font-semibold text-xl">Crear Categoria</h1>
                <input type="text" 
                value={CATnombre} onChange={handleCATnombreChange} required
                className="bg-slate-200 rounded w-96 px-2 p-1 mb-2 lg:mb-0" />
                
                <input type="submit" value="Crear" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 md:ml-2 " />

            </form>

            <div className="grid  lg:grid-cols-4 md:grid-cols-3  grid-cols-2 ">
                {categorias.map((cat, index) => (
                    <Categori key={index} categoria={cat}></Categori>
                ))}


            </div>
        </>
    )
}

export default Categorias;


interface Props {
    categoria:Categoria;
}
const Categori: React.FC<Props> = ({ categoria}) =>{

    const fecha = new Date( categoria.createdAt).toLocaleDateString();

    return (
        <>
            <div className="bg-slate-300 rounded p-4 my-2 mx-2">
                <h1 className="flex justify-center text-2xl font-bold">{categoria.CATnombre}</h1>
                <div className="">
                    <p className="font-semibold">Creado por:</p><p>{categoria.CATusuario.nombre}</p>
                </div>
                <div className="">
                    <p className="font-semibold">Fecha de creacion:</p> <p>{fecha}</p>
                </div>
                {categoria.CATactivo ? (
                    <button className="w-full hover:bg-red-400 bg-red-500 rounded p-2 font-bold text-white ">Desactivar</button>

                ): (
                    <button className="w-full hover:bg-slate-400 bg-slate-500 rounded p-2 font-bold text-white ">Reactivar</button>

                )}

            </div>

        </>
    )
}