import mongoose from "mongoose";

const reporteSchema = new mongoose.Schema(
    {
        REPusuario: {
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },
        REPdescripcion: {
            type:String,
            required:true
        },
        REPtipo: {
            type:String,
            enum: ['pub', 'com'],
            required: true
        },
        REPpublicacion:{
            type:mongoose.Schema.Types.ObjectId, ref: 'publicacion',
            default: null
        },
        REPcomentario: {
            type:mongoose.Schema.Types.ObjectId, ref: 'comentario',
            default: null
        },
        REPrespuesta:{
            type:String,
            required:false
        },
        REPrevisado: {
            type:Boolean,
            default:false
        }
    },{timestamps:true}

)

export default mongoose.model('reporte', reporteSchema);