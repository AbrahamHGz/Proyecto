import mongoose from "mongoose";

const reporteSchema = new mongoose.Schema(
    {
        REPdescripcion: {
            type:String,
            required:true
        },
        REPenlace:{
            type:String,
            required:true
        },
        REPespuesta:{
            type:String,
            required:false
        }
    },{timestamps:true}

)

export default mongoose.model('reporte', reporteSchema);