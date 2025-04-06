import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
    {
        CATnombre:{
            type:String,
            required:true,
            unique:true
        },
        CATusuario:{
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },

    },{timestamps: true}
)

export default mongoose.model('categoria', categoriaSchema);