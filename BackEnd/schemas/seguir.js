import mongoose from "mongoose";

const seguirSchema = new mongoose.Schema (
    {
        SEGusuario: {
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },
        SEGsiguiendoA: { 
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        }
    }, {timestamps: true}
)

export default mongoose.model('seguir', seguirSchema);