import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
    {
        COMdescripcion: {
            type:String,
            required:true,
        },
        COMlikes:{
            type:Number,
            required:false,
            default: 0
        },
        COMusuario:{
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },
        COMpublicacion: {
            type:mongoose.Schema.Types.ObjectId, ref: 'publicacion',
            required:true
        },
        COMestatus: {
            type:Boolean,
            default:true
        }
        

    }, {timestamps:true}
)

export default mongoose.model('comentario',comentarioSchema)