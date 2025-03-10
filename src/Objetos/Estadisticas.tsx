import React from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Dibujos", publicacion: 400 },
  { name: "3D", publicacion: 300 },
  { name: "Conceptuales", publicacion: 500 },
  { name: "Digital", publicacion: 700 },

];

const dataUsu = [
    { name: "usuario123", publicacion: 400 },
    { name: "3D", publicacion: 300 },
    { name: "Conceptuales", publicacion: 500 },
    { name: "Digital", publicacion: 700 },
    { name: "usuario123", publicacion: 400 },
    { name: "3D", publicacion: 300 },
    { name: "Conceptuales", publicacion: 500 },
    { name: "Digital", publicacion: 700 },
    { name: "usuario123", publicacion: 400 },
    { name: "3D", publicacion: 300 },
    { name: "Conceptuales", publicacion: 500 },
    { name: "Digital", publicacion: 700 },
  
  ];

const Estadisticas: React.FC = () => {
    return(
        <>
        <div>
            <h1 className="font-bold text-2xl">Estadísticas</h1>

                <div className="p-6 bg-white  shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Cantidad de publicaciones por categoria</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <XAxis dataKey="name" className="text-sm" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="publicacion" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 bg-white  shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Usuarios con más seguidores</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataUsu}>
                      <XAxis dataKey="name" className="text-sm" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="publicacion" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
        </div>
        </>
    )
}

export default Estadisticas;