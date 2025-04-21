export interface Categoria {
   _id:string;
   CATnombre: string;
   CATusuario: {
    _id:string;
    nombre: string;
   }
   CATactivo: boolean; 
   createdAt:string;
   updatedAt:string
}
