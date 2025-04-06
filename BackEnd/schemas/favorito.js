import mongoose from "mongoose";

const favoritoSchema = new mongoose.Schema(
    {
        FAVusuario:{
            type:mongoose.Schema.Types.ObjectId, ref: 'usuario',
            required:true
        },
        FAVpublicacion: {
            type:mongoose.Schema.Types.ObjectId, ref: 'publicacion',
            required:true
        }
        

    }, {timestamps: true}
)

export default mongoose.model('favorito', favoritoSchema);