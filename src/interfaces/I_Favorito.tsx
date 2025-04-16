export interface I_Favorito{
    _id:string,
    FAVusuario:{
        _id:string,
        nombre:string
    },
    FAVpublicacion:{
        _id:string,
        PUBnombre:string,
        PUBimagen:string
    }
}