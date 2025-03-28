import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
    {
        Descripcion: {
            type:String,
            required:true,
        },
        Likes:{
            type:Number,
            required:false,
            default: 0
        },

    }, {timestamps:true}
)

export default mongoose.model('comentario',comentarioSchema)