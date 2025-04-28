// services/apiUsuarios.ts

export const buscarUsuarioPorEmail = async (email: string) => {
    try {
        const response = await fetch(`http://localhost:5100/api/usuarios/email/${encodeURIComponent(email)}`);
        
        if (!response.ok) {
            return null; // usuario no encontrado
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en buscarUsuarioPorEmail:", error);
        throw error;
    }
};
