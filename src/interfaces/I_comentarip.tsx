export interface I_Comentario {
    _id:string,
    COMdescripcion:string,
    COMlikes: number,
    COMusuario: {    
        _id:string,
        nombre:string,
        imagen:string
    },
    COMpublicacion: {
        _id:string,
        nombre:string
    },
    createdAt:string;
    updatedAt:string
    

}
