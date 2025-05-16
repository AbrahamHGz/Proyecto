export interface publicacion {
    _id:string
    PUBnombre:string,
    PUBcategorias:[{
        _id:string,
        CATnombre:string
    }]
    PUBusuario: {
        _id:string,
        nombre:string,
        imagen:string,
        Estatus:boolean; 
    },
    PUBlikes:number;
    PUBdescripcion:string;
    PUBstatus:Boolean,
    PUBimagen:string,
    createdAt:string;
    updatedAt:string
    likesCount: number;
}