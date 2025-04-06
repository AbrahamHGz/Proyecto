import React, { useState, useRef, useEffect } from "react";
import Menu from "../Objetos/Menu";
import { useNavigate, useParams } from "react-router-dom";

const Editar_Publicacion: React.FC = () => {
        const [titulo, setTitulo] = useState('');
        const [descripcion, setDescripcion] = useState('');
        const [categoria, setCategoria] = useState('Arte');
        const [imagen, setImagen] = useState<string | null>(null);
        const [imagenFile, setImagenFile] = useState<File | null>(null);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [error, setError] = useState('');
        const fileInputRef = useRef<HTMLInputElement>(null);
        const navigate = useNavigate();
        const { id } = useParams();
    
        const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
    
        useEffect(() => {
            if (id) {
                const publicacionEjemplo = {
                    titulo: "Ejemplo de publicación",
                    descripcion: "Esta es una publicación de ejemplo",
                    categoria: "3D",
                    imagenUrl: "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"
                };
                
                setTitulo(publicacionEjemplo.titulo);
                setDescripcion(publicacionEjemplo.descripcion);
                setCategoria(publicacionEjemplo.categoria);
                setImagen(publicacionEjemplo.imagenUrl);
            } }, [id]);
    
        const handleImageButtonClick = () => {
            fileInputRef.current?.click();
        };
    
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                if (!file.type.match('image.*')) {
                    setError('Por favor, selecciona un archivo de imagen válido (JPEG, PNG, etc.)');
                    return; }
                
                if (file.size > MAX_IMAGE_SIZE) {
                    setError(`La imagen no debe exceder los 20MB (tamaño actual: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
                    return; }
    
                setError('');
                setImagenFile(file);
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setImagen(event.target.result as string); } };
                reader.readAsDataURL(file); }
        };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            
            if (!titulo.trim()) {
                setError('El título es requerido');
                setIsSubmitting(false);
                return; }
    
            try {
                console.log('Datos a enviar:', {
                    titulo,
                    descripcion,
                    categoria,
                    imagen: imagenFile 
                        ? `Archivo: ${imagenFile.name} (${(imagenFile.size / (1024 * 1024)).toFixed(2)}MB)`
                        : 'Usando imagen existente' });
            
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                alert(id ? 'Publicación actualizada (simulación)' : 'Publicación creada (simulación)');
                navigate('/mis-publicaciones');
            } catch (err) {
                console.error("Error:", err);
                setError('Error al procesar la publicación');
            } finally {
                setIsSubmitting(false);
            } 
        };
    return(
        <>
            <Menu></Menu>
            <Menu></Menu>
            <div className="pt-26 ">
                <div className="mt-2 p-4 rounded md:mx-20 md:bg-gray-400">
                    <h1 className="flex justify-center text-white font-bold  text-3xl">Editar Publicación</h1>
                    <form onSubmit={handleSubmit} className="grid xl:grid-cols-3 my-2">

                        <ol className="">
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Titulo:</label>
                                <br />
                                <input 
                                    type="text" 
                                    id="titulo"
                                    className="xl:w-95 w-full rounded bg-slate-200 px-2 p-1" 
                                    placeholder="Título"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                required />
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Descripción:</label>
                                <br />
                                <textarea 
                                    id="descripcion"
                                    className="xl:w-95 w-full rounded bg-slate-200 px-2 p-1 h-32" 
                                    placeholder="Descripción"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl ">Categorias</label>
                                <br />
                                <select 
                                    id="categoria"
                                    className="mt-2 rounded bg-slate-200 px-2 p-1" 
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)} >
                                    <option value="Arte">Arte</option>
                                    <option value="3D">3D</option>
                                    <option value="Fotografía">Fotografía</option>
                                    <option value="Diseño">Diseño</option>
                                </select>

                                <p className="text-white" id="CategoriaZone">Arte, 3D</p>
                            </li>
                            <li className="mt-4">
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button 
                                    type="button"
                                    onClick={handleImageButtonClick}
                                    className="bg-slate-500 rounded text-white font-bold text-lg hover:text-black hover:bg-slate-300 lg:w-96 w-full p-2"
                                >
                                    {imagen ? 'Cambiar imagen' : 'Cargar imagen'}
                                </button>
                                <p className="text-white text-xs mt-1">Formatos: JPG, PNG (Máx. 20MB)</p>
                                {imagenFile && (
                                    <p className="text-white text-xs mt-1">
                                    Tamaño: {(imagenFile.size / (1024 * 1024)).toFixed(2)}MB
                                    </p> )}
                            </li>
                            <li className="xl:hidden mt-4">
                                {imagen ? (
                                    <img 
                                        src={imagen} 
                                        alt="Vista previa" 
                                        className="my-4 rounded max-h-64 object-contain" /> ) : (
                                    <div className="bg-gray-200 rounded flex items-center justify-center h-64 my-4">
                                        <span className="text-gray-500">Vista previa de la imagen</span>
                                    </div>
                                )}
                            </li>


                            <li className="mt-4">
                                <input type="submit" value="Editar" className="mb-2 text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700  md:w-96 w-full p-1" />
                            </li>
                        </ol>
                        <div className="hidden xl:block col-span-2">
                            {imagen ? (
                                <img 
                                    src={imagen} 
                                    alt="Vista previa" 
                                    className="w-full pl-3 max-h-96 object-contain" />
                            ) : (
                                <div className="bg-gray-200 rounded flex items-center justify-center h-96 ml-3">
                                <span className="text-gray-500">Vista previa de la imagen</span>
                                </div> )}
                        </div>
                    </form>
                    
                    <button className="text-red-800 hover:underline hover:text-red-900 font-bold">
                        borrar
                        </button>

                </div>
                    <p className="p-2"></p>
            </div>
        </>
    )
}

export default Editar_Publicacion;