export interface I_Comentario {
    _id:string,
    COMdescripcion:string,
    COMlikes: number,
    COMusuario: {    
        _id:string,
        nombre:string
    },
    COMpublicacion: {
        _id:string,
        nombre:string
    }
    

}
