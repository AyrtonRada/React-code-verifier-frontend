import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

// Importar React Router DOM
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../components/editor/Editor";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataByID } from "../services/katasService";
import { Kata } from "../utils/types/Kata.type";

export const KatasDetailPage = () => {

    let loggedIn = useSessionStorage('sessionJWTToken')
     
    // Variable para navegar entre rutas
    let navigate = useNavigate()

    // Encontrar por ID desde params
    let { id } = useParams()

    const [kata, setKata] = useState<Kata | undefined>(undefined)
    const [showSolution, setShowSolution] = useState(false)
    //comprobar que antes de acceder a las katas estemos logeados
    useEffect(() => {
        if(!loggedIn){           //comprobamos el valor de loggedIn
            return navigate('/login') // como en session no hay nada "no esta la key" retornara al login 
        }else{
            if(id){
                getKataByID(loggedIn, id)
            .then((response: AxiosResponse) =>{
                if(response.status === 200 && response.data){
                    let kataData = {
                        _id: response.data._id,
                        name: response.data.name,
                        description: response.data.description,
                        stars: response.data.stars,
                        level: response.data.level,
                        intents: response.data.intents,
                        creator: response.data.creator,
                        solution: response.data.solution,
                        participants: response.data.participants
                    }
                    console.table(kataData)
                }


            }).catch((error) => console.error(`[Kata By ID ERROR]: ${error}`))
            }else{
                return navigate('/katas')
            }
            
            
        }
    }, [loggedIn])

    
    
    return(
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
            { kata ?
                <div className="kata-data">
                    <h2> {kata?.description} </h2>
                    <h3> Rating: {kata.stars}/5 </h3>
                    <button onClick={() => setShowSolution(!showSolution)}>
                         {showSolution ? 'Show Solution': 'Hide Solution'}
                    </button>
                         { showSolution ? null: <Editor>{ kata.solution }</Editor> }
                </div>
            :
                <div>
                    <h2>
                        Loading data...
                    </h2>
                </div>
            }
            
        </div>
    )
}