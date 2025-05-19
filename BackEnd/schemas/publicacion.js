import mongoose from "mongoose";

const publicacionSchema = new mongoose.Schema(
    {

        PUBnombre:{
            type:String,
            required:true
        },
        PUBcategorias:[{
            type:mongoose.Schema.Types.ObjectId, ref: 'categoria',
            required:true
        }],
        PUBusuario:{
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },
        PUBlikes:{
            type:Number,
            required: false,
            default: 0
        },
        PUBdescripcion:{
            type:String,
            required:true,
        },
        PUBestatus:{
            type:Boolean,
            default:true
        },
        PUBimagen: {
            type:String,
            default:null
        }
    },
    {timestamps: true}

)

export default mongoose.model('publicacion', publicacionSchema);