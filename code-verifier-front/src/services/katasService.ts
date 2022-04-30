import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

export const getAllKatas = (token: string, limit?: number, page?: number) =>{
    //http://localhost:8000/api/katas?limit=1&?page=1 
    // add headers with JWT in x-access-token

    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            limit,
            page
        }
    }
    return axios.get('/katas', options)
}    
    //otra forma de hacerlo

    //return axios.get('/katas',{ //ponemos el valor que tendra la cabecera "headers" y  otros valores
    //    headers: {
    //        'x-access-token': token
    //    },
    //    params: {
    //        limit,
    //        page
    //    }
    //})


export const getKataByID = (token: string, id: string) => {
    //http://localhost:8000/api/katas?id=XXXXXXXXX
    // añadir el token al encabezado
    
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            id
        }
    }
    return axios.get('/katas', options)
}
