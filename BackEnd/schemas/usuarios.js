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
        edad:{
            type: Number,
            required: false
        }
        // password:{
        //     type: String,
        //     require: true
        // },
        // sexo:{
        //     type:String,
        //     require: true
        // },
        // FechaNac:{
        //     type:Date,
        //     require: true
        // },
        // FechaReg:{
        //     type:Date,
        //     require:false
        // },
        // FechaAct:{
        //     type:Date,
        //     require:false
        // },
        // FechaDelete:{
        //     type:Date,
        //     require:false
        // }



    },{timestamps: true}
);

export default mongoose.model('usuario', usuarioSchema);