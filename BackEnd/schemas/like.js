import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        LIKusuario: {
            type: mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required: true
        },
        LIKpublicacion: {
            type:mongoose.Schema.Types.ObjectId, ref: 'publicacion',
            required:true            
        }
    }, {timestamps: true}
)

export default mongoose.model('like', likeSchema);