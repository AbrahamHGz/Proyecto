import React from "react";

const Menu: React.FC = () => {
    return (
        <>
            <div className="bg-slate-950 p-4">
                <div className="grid grid-cols-3 flex items-center">
                    <div>
                        <a href="" className="mx-2 text-4xl font-bold text-white">ARTROPOLIS</a>
                    </div>
                    <form action="" className="">
                        <input type="text" className="
                        bg-stone-700 w-full p-2 rounded text-stone-300" 
                        placeholder="Buscar"/>
                       
                    </form>
                    
                    <div className="flex justify-end text-white">

                        <a href="" className=" mx-2 ">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU" 
                            alt="" className="size-16 rounded-full" />
                        </a>
                    </div>
                </div>

            </div>
        </>        
    )
}

export default Menu;