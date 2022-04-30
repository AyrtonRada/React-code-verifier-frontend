import { AxiosResponse } from "axios";
import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/katasService";
import { Kata } from "../utils/types/Kata.type";

export const KatasPages = () => {
    
    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()
    
    // State of component
    const [katas, setKatas] = useState([]) // katas inicialmente estara vacia
    const [totalPages, setTotalPage] = useState(1) //iniciara con valores por defecto
    const [currentPage, setCurrentPage] = useState(1) //iniciara con valores por defecto

    //comprobar que antes de acceder a las katas estemos logeados
    useEffect(() => {
        if(!loggedIn){           //comprobamos el valor de loggedIn
            return navigate('/login') // como en session no hay nada "no esta la key" retornara al login 
        }else{
            getAllKatas(loggedIn, 2, 1) // valores pasados como ejemplo para el limit y page
            .then((response: AxiosResponse) => {

                if(response.status === 200 && response.data.katas && response.data.totalPages && response.data.currentPage) {
                    console.table(response.data)
                    let { katas, totalPages, currentPage } = response.data
                    setKatas(katas)
                    setTotalPage(totalPages)
                    setCurrentPage(currentPage)
                }else{
                    throw new Error (`Error obtaining katas: ${response.data}`)
                }
            }).catch((error) => console.error(`[Get All Katas Error] ${error}`))
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
            { katas.length > 0 ? 
                    <div>
                       { katas.map((kata: Kata) => (
                        <div key = {kata._id}> 
                          <h3 onClick={() => navigateToKataDetail(kata._id)}> {kata.name} </h3>
                          <h4> {kata.description} </h4>
                          <h5> Creator: {kata.creator} </h5>  
                          <p> Rating: {kata.stars} </p>
                        </div>))}        
                    </div>
                :
                    <div>
                        <h5>
                            No katas found
                        </h5>
                    </div>
            }
        </div>
    )
}