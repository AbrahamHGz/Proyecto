import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true,
            unique:true
        },
        usuario:{
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },

    },{timestamps: true}
)

export default mongoose.model('categoria', categoriaSchema);