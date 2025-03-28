import mongoose from "mongoose";

const favoritoSchema = new mongoose.Schema(
    {
        publicacion:{
            type:String,
            require:true
        },
        usuario:{
            type:String,
            require:true
        }

    }, {timestamps: true}
)

export default mongoose.model('favorito', favoritoSchema);