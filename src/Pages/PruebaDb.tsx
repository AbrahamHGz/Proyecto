import React,{ useState} from "react";
// Esta es una prueba de un formulario hacia mongoDB
const PruebaDb: React.FC = () =>{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            nombre,
            email
        }

        //Enviar datos al servidor
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
        }catch(error){
            console.error('Error al enviar el formulario:', error);
        }
    };
    

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Nombre</label>
                <br />
                <input type="text" value={nombre} className="border" 
                onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
            <label htmlFor="">Email</label>
                <br />
                <input type="email" value={email} className="border" 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit">Enviar</button>
        </form>
        </>
    )
}

export default PruebaDb;