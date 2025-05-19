import React,{ useState} from "react";
import { crearUsuario } from "../services/api";

const PruebaDb: React.FC = () =>{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState<number | "">("");
    

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         await crearUsuario(nombre, email, Number(edad));
    //         alert("Usuario creado exitosamente");
    //         setNombre("");
    //         setEmail("");
    //         setEdad("");
    //     } catch (error) {
    //         alert("Error al crear usuario");
    //     }
    // };
    

    return (
        <>
        {/* <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Nombre</label>
                <br />
                <input type="text" value={nombre} className="border" 
                onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Edad</label>
                <br />
                <input type="number" value={edad} className="border" 
                onChange={(e) => setEdad(e.target.value ? Number(e.target.value): "")} />
            </div>
            <div>
            <label htmlFor="">Email</label>
                <br />
                <input type="email" value={email} className="border" 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit">Enviar</button>
        </form> */}
        </>
    )
}

export default PruebaDb;