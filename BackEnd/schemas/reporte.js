import mongoose from "mongoose";

const reporteSchema = new mongoose.Schema(
    {
        Descripcion: {
            type:String,
            required:true
        },
        Enlace:{
            type:String,
            required:true
        },
        Respuesta:{
            type:String,
            required:false
        }
    },{timestamps:true}

)

export default mongoose.model('reporte', reporteSchema);