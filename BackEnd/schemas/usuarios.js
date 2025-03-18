import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        sexo:{
            type:String,
            required: true,
            enum:["Hombre", "Mujer"]
        },
        TipoUsu:{
            type:String,
            required: true,
            enum:["artista", "admin", "superadmin"]
        },
        FechaNac:{
            type:Date,
            required: true
        },
        FechaReg:{
            type:Date,
            required:false
        },
        FechaAct:{
            type:Date,
            required:false
        },
        FechaDelete:{
            type:Date,
            required:false
        },
        Estatus:{
            type:Boolean,
            required:true,
            default:true
        }



    },{timestamps: true}
);

export default mongoose.model('usuario', usuarioSchema);