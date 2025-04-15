export interface publicacion {
    _id:string
    PUBnombre:string,
    PUBcategorias:[{
        _id:string,
        CATnombre:string
    }]
    PUBusuario: {
        _id:string,
        nombre:string;
    },
    PUBlikes:number;
    PUBdescripcion:string;
    PUBstatus:Boolean
}