import React, { useState, useRef, useEffect } from "react";
import Menu from "../Objetos/Menu";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaSelect from "../Objetos/CategoriaSelect";
import { borrarPublicacion, editarPublicacion, obtenerUnaPublicacion } from "../services/apiPublicacion";


const Editar_Publicacion: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categriasSeleccionadas, setCategoriaSeleccionada] = useState<string[]>([]);
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState<string | null>(null);
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showConfirmEdit, setShowConfirmEdit] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [alerts, setAlerts] = useState<{ msg: string, type: 'success' | 'error' }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const showAlert = (msg: string, type: 'success' | 'error' = 'error') => {
        setAlerts([{ msg, type }]);
        setTimeout(() => setAlerts([]), 3000);
    };

    const { id } = useParams<{ id: string }>();

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const email = usuarioInfo.email

    const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

    const fetchData = async () => {
        try {
            if (id) {

                const data = await obtenerUnaPublicacion(id);
                setTitulo(data.PUBnombre);
                setDescripcion(data.PUBdescripcion);
                setCategoriaSeleccionada(data.PUBcategorias.map((cat: any) => cat.CATnombre));
                setImagen(data.PUBimagen)
                console.log("Categorías recibidas:", data.PUBcategorias);
            }

        } catch (error) {
            console.log("Error al cargar la publicacion:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.match('image.*')) {
                setError('Por favor, selecciona un archivo de imagen válido (JPEG, PNG, etc.)');
                return;
            }

            if (file.size > MAX_IMAGE_SIZE) {
                setError(`La imagen no debe exceder los 20MB (tamaño actual: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
                return;
            }

            setError('');
            setImagenFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImagen(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!titulo.trim()) {
            setError('El título es requerido');
            setIsSubmitting(false);
            return;
        }
        setShowConfirmEdit(true);
    };

    const handleConfirmEdit = async () => {
        setShowConfirmEdit(false);
        try {
            console.log('Datos a enviar:', {
                titulo,
                descripcion,
                categoria,
                imagen: imagenFile
                    ? `Archivo: ${imagenFile.name} (${(imagenFile.size / (1024 * 1024)).toFixed(2)}MB)`
                    : 'Usando imagen existente'
            });

            if (!id) {
                return alert("No se puede modificar la publicacion, ID inexistente");
            }
            await editarPublicacion(
                titulo,
                categriasSeleccionadas,
                descripcion,
                id,
                imagen
            )

            showAlert('Publicación actualizada', "success");
            setTimeout(() => {
                navigate(`/Publicacion/${id}`);
                
            }, 1000);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, "error");
            } else {
                alert("Error inesperado al editar la publicacion");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelEdit = () => {
        setShowConfirmEdit(false);
        setIsSubmitting(false);
    };

    const handleDeleteClick = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDelete(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirmDelete(false);
        try {
            if (!id) {
                return alert("No se puede borrar la publicacion, ID inexistente");
            }
            await borrarPublicacion(
                id,
                false
            )

            showAlert('Publicacion borrada', "success");
            setTimeout(() => {
                navigate(`/Home`);
                
            }, 1000);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, "error");
            } else {
                alert("Error inesperado al borrar la publicación");
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmDelete(false);
    };


    const añadirCategoria = () => {
        if (categoria && !categriasSeleccionadas.includes(categoria)) {
            setCategoriaSeleccionada([...categriasSeleccionadas, categoria]);
        }
    }

    const eliminarCategoria = (categoriaAEliminar: string) => {
        setCategoriaSeleccionada(categriasSeleccionadas.filter(cat => cat !== categoriaAEliminar));
    }
    return (
        <>
            <Menu></Menu>

            {alerts.map((alert, idx) => (
                <div key={idx} className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${alert.type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-2 rounded-lg shadow-lg z-50`}>
                    {alert.msg}
                </div>
            ))}
            <div className="pt-26 ">
                <div className="mt-2 p-4 rounded md:mx-20 md:bg-gray-400">
                    <h1 className="flex justify-center text-white font-bold  text-3xl">Editar Publicación</h1>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="grid xl:grid-cols-3 my-2">

                        <ol className="">
                            <li>
                                <label htmlFor="titulo" className="font-semibold text-white text-2xl">Titulo:</label>
                                <br />
                                <input type="text" id="titulo" className="xl:w-95 w-full rounded bg-slate-200 px-2 p-1" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                            </li>
                            <li>
                                <label htmlFor="descripcion" className="font-semibold text-white text-2xl">Descripción:</label>
                                <br />
                                <textarea id="descripcion" className="xl:w-95 w-full rounded bg-slate-200 px-2 p-1 h-32" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl ">Categorias</label>
                                <br />
                                <CategoriaSelect value={categoria} onChange={setCategoria} />

                                <button type="button" className="bg-slate-300 rounded px-2 hover:bg-slate-500"
                                    onClick={añadirCategoria}
                                >Añadir</button>


                                <p className="text-white" id="CategoriaZone">
                                    {categriasSeleccionadas.map((cat, index) => (
                                        <span key={index} className="inline-block bg-gray-500 hover:bg-red-700 text-white px-2 py-1 rounded-full text-sm mr-2 mt-2"
                                            onClick={() => eliminarCategoria(cat)} title="Haz click para eliminar esta categoria">
                                            {cat}
                                        </span>
                                    ))}
                                </p>
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
                                    </p>)}
                            </li>
                            <li className="xl:hidden mt-4">
                                {imagen ? (
                                    <img
                                        src={imagen}
                                        alt="Vista previa"
                                        className="my-4 rounded max-h-64 object-contain" />) : (
                                    <div className="bg-gray-200 rounded flex items-center justify-center h-64 my-4">
                                        <span className="text-gray-500">Vista previa de la imagen</span>
                                    </div>
                                )}
                            </li>


                            <li className="mt-4">
                                <input
                                    type="submit"
                                    value="Editar"
                                    disabled={isSubmitting}
                                    className="mb-2 text-white font-bold bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 md:w-96 w-full p-1"
                                />
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
                                </div>)}
                        </div>
                    </form>

                    <button onClick={handleDeleteClick} className="text-red-800 hover:underline hover:text-red-900 font-bold">
                        Borrar
                    </button>

                </div>
                <p className="p-2"></p>
            </div>

            {showConfirmEdit && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
                        <p className="text-lg font-semibold">¿Seguro que deseas editar esta publicación?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
                        <p className="text-lg font-semibold">¿Estás seguro que deseas borrar esta publicación?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Editar_Publicacion;