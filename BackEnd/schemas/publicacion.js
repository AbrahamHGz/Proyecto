import mongoose from "mongoose";

const publicacionSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true
        },
        categorias:{
            type:String
        },
        Likes:{
            type:Number,
            required: false,
            default: 0
        },
        Descripcion:{
            type:String,
            required:true,
        }
    },
    {timestamps: true}

)

export default mongoose.model('publicacion', publicacionSchema);