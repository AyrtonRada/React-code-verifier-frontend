import React, { useEffect } from "react";

// Importar React Router DOM
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasDetailPage = () => {

    let loggedIn = useSessionStorage('sessionJWTToken')
     
    // Variable para navegar entre rutas
    let navigate = useNavigate()
    
    //comprobar que antes de acceder a las katas estemos logeados
    useEffect(() => {
        if(!loggedIn){           //comprobamos el valor de loggedIn
            return navigate('/login') // como en session no hay nada "no esta la key" retornara al login 
        }
    }, [loggedIn])

    // Encontrar por ID desde params
    let { id } = useParams()
    
    return(
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
        </div>
    )
}