import React, { useEffect, useState } from "react";
import { obtenerCategoriasDetallada } from "../services/apiCategoria";
import { Categoria } from "../interfaces/categoria";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const CategoriaSelect: React.FC<Props> = ({ value, onChange }) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    
    const fetchCategorias = async () => {
        try {
            const data = await obtenerCategoriasDetallada();
            setCategorias(data);
        } catch(error) {
            console.error("Error al obtener categorías:", error);
        }
    }

    useEffect(() => {
        fetchCategorias();
    }, []);

    return(
        <select 
            className="bg-white rounded px-2 m-2" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
            <option value={cat.CATnombre} key={cat._id}>{cat.CATnombre}</option>
            ))}
        </select>
    )
}

export default CategoriaSelect;