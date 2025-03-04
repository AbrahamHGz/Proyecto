import React from "react";

const Acerca_de_mi: React.FC = () => {
    return (
        <>
            <div>
                <div className="flex space-x-10 items-center">
                    <h1 className="text-2xl font-semibold">Acerca de mí</h1> 
                    <button className="border text-white hover:bg-slate-500 px-5 p-1">Editar</button>
                </div>
                <p className="p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas vitae harum nam dolor, commodi quia ipsam hic minus quidem enim, ullam sunt ducimus at distinctio tenetur saepe autem expedita voluptas.</p>
            </div>
        </>
    )
}

export default Acerca_de_mi;