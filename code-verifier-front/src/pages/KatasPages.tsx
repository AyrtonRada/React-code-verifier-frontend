import React, {useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasPages = () => {
    
    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()
    
    //comprobar que antes de acceder a las katas estemos logeados
    useEffect(() => {
        if(!loggedIn){           //comprobamos el valor de loggedIn
            return navigate('/login') // como en session no hay nada "no esta la key" retornara al login 
        }
    }, [loggedIn])

    const navigateToKataDetail = (id: number) => {
        navigate(`/katas/${id}`)
    }
    return(
        <div>
            <h1>
                Katas Pages
            </h1>
            <ul>
                <li onClick={ () => navigateToKataDetail(1)}>Fist Kata</li>
                <li onClick={ () => navigateToKataDetail(2)}>Second Kata</li>
            </ul>
        </div>
    )
}