import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

// importar nuestro servicio para realizar el pedido http
import { login } from "../../services/authService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

//Define Schema of validation with Yup
const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Format').required('Email is required'),
    password: Yup.string().required('Password is required')
})

//Login Component
const LoginForm = () => {
    //Definimos las credenciales iniciales
    const initialCredentials= {
        email: '',
        password: ''
    }
    let navigate = useNavigate()
    return(
        <div>
            <h4>Login Form</h4>
            <Formik //Formik encapsula un formulario
                initialValues = { initialCredentials }
                validationSchema = { loginSchema }
                onSubmit = { async(values) =>{
                    login(values.email, values.password).then((response: AxiosResponse)=>{
                        if(response.status === 200){
                            if(response.data.token){
                                sessionStorage.setItem('sessionJWTToken', response.data.token)
                                navigate('/')
                            }else{
                                throw new Error('Error generating Login Token')
                            }
                        }else{
                            throw new Error('Invalid Credentials')
                        }
                    }).catch((error)=> console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))
                }}
            >
                {/*Propiedades que nos da Formik*/}
                {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur}) => ( // touched es usado si el usuario interactuo con el input
                        <Form>
                            {/*Email Field*/}
                            <label htmlFor='email'>Email</label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com'/>
                            
                            {/*Email Errors*/}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            }
                           
                            {/*Password Field*/}
                            <label htmlFor='password'>Password</label>
                            <Field id='password' type='password' name='password' placeholder='example'/>
                            
                            {/*Password Errors*/}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }

                            {/* SUMBIT FORM*/}
                            <button type="submit">Login</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting? (<p>Checking credentials...</p>):null
                            }
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default LoginForm