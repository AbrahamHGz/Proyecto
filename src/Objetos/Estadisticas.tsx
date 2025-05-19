import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface CategoriaCount {
  name: string;
  publicacion: number;
}

interface UserLike {
  name: string;
  likes: number;
}

const Estadisticas: React.FC = () => {
  const [categoriaData, setCategoriaData] = useState<CategoriaCount[]>([]);
  const [userLikeData, setUserLikeData] = useState<UserLike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {

        // Obtener publicaciones//
        const res = await fetch("http://localhost:5100/publicacion");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const publicaciones = await res.json();

        const categoriaCounts: Record<string, number> = {};
        publicaciones.forEach((pub: any) => {
          pub.PUBcategorias.forEach((cat: any) => {
            const nombre = cat.CATnombre;
            categoriaCounts[nombre] = (categoriaCounts[nombre] || 0) + 1;
          });
        });
        setCategoriaData(Object.entries(categoriaCounts).map(([name, publicacion]) => ({ name, publicacion })));

        const publicacionesConLikes = await Promise.all(
          publicaciones.map(async (pub: any) => {
            const resLikes = await fetch(`http://localhost:5100/like/count/${pub._id}`);
            const { cantidadLikes } = await resLikes.json();
            return { ...pub, likes: cantidadLikes };
          })
        );

        const userLikes: Record<string, { total: number; name: string }> = {};
        publicacionesConLikes.forEach((pub) => {
          const usuario = pub.PUBusuario;
          if (usuario && usuario._id) {
            if (!userLikes[usuario._id]) {
              userLikes[usuario._id] = {
                total: 0,
                name: usuario.nombre,
              };
            }
            userLikes[usuario._id].total += pub.likes;
          }
        });

        const topUsuarios = Object.values(userLikes)
          .sort((a, b) => b.total - a.total)
          .slice(0, 10)
          .reverse()
          .map((user) => ({
            name: user.name,
            likes: user.total,
          }));

        setUserLikeData(topUsuarios);
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <div>Cargando estadísticas…</div>;
  if (error) return <div>Error al cargar datos: {error}</div>;

  return (
    <div>
      <h1 className="font-bold text-2xl">Estadísticas</h1>

      <div className="p-6 bg-white shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Publicaciones por categoría</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoriaData}>
            <XAxis dataKey="name" className="text-sm" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="publicacion" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 bg-white shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Top 10 artistas con más likes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userLikeData}>
            <XAxis dataKey="name" className="text-sm" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="likes" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Estadisticas;