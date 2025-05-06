import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

export interface CategoriaStat {
  name: string;
  publicacion: number;
}

export const obtenerEstadisticasCategorias = async (): Promise<CategoriaStat[]> => {
  const { data } = await axios.get<CategoriaStat[]>(
    `${API_URL}/publicacion/stats/categorias` );
  return data;
};
