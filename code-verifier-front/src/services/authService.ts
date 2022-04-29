import axios from "../utils/config/axios.config";

export const login = (email: string, password: string) => {
    //Declare Body to POST
    let body = {
        email: email,
        password: password
    }

    //send POST request to login endpoint
    //http: //localhost:8000/api/auth/login
    return axios.post('/auth/login', body)
}

export const register = (name: string, email: string, password: string, age: number) => {
    //Declare Body to POST
    let body = {
        name: name,
        email: email,
        password: password,
        age: age
    }

    //send POST request to login endpoint
    //http: //localhost:8000/api/auth/register
    return axios.post('/auth/register', body)
}