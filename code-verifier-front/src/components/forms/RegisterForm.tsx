import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import  {register} from '../../services/authService'
import * as Yup from 'yup'
import { AxiosResponse } from "axios";

const RegisterForm = () =>{

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        age: 18,
    }

    // Yup validation schema
    const registerSchema = Yup.object().shape({ //primero ira el valor de condicion y luego el valor de error (#,'error')
        name: Yup.string()
        .min(6, 'Username must have 6 letters mininum')
        .max(12,'Username must have maximum 12 letters')
        .required('Username is required'),
        email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
        password: Yup.string()
        .min(8, 'Password too short')
        .required('Password is required'),
        confirm: Yup.string().when('password',{ //cuando el campo se rellena hace los siguiente
            is: (value: string) => (value && value.length >0 ? true : false), //comprobamos que el valor tiene que estar presente y la longitud
            then: Yup.string().oneOf( //el then especificara el valor que tiene que tener, y validamos el "1de"
                [Yup.ref('password')], 'Passwords must match') //usamos el ref para acceder a la referencia, en este caso password
        })
        .required('You must confirm your password'),
        age: Yup.number()
        .min(10, 'You must be over 10 years old')
        .required('Age is required')
    })




    return(
        <div>
            <h4>Register as a new user</h4>
            {/* Formik wrapper*/}
            <Formik
                initialValues={ initialValues }
                validationSchema = { registerSchema }
                onSubmit = { async(values) =>{
                    register(values.name, values.email, values.password, values.age).then((response: AxiosResponse)=>{
                        if(response.status === 200){
                            console.log('User registered correctly')
                            console.log(response.data)
                            alert('User registered correctly')
                        }else{
                            throw new Error('Error in registry')
                        }
                    }).catch((error)=> console.error(`[REGISTER ERROR]: Something went wrong: ${error}`))
                }}
            >
                {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur}) => ( // touched es usado si el usuario interactuo con el input
                        <Form>
                            {/*Name Field*/}
                            <label htmlFor='name'>Name</label>
                            <Field id='name' type='text' name='name' placeholder='example'/>
                            
                            {/*Name Errors*/}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )
                            }

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
                            <Field id='password' type='password' name='password' placeholder='Password'/>
                            
                            {/*Password Errors*/}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }
                           
                            {/*Confirm Password Field*/}
                            <label htmlFor='confirm'>Confirm Password</label>
                            <Field id='confirm' type='password' name='confirm' placeholder='Confirm your password'/>
                            
                            {/*Confirm Password Errors*/}
                            {
                                errors.confirm && touched.confirm && (
                                    <ErrorMessage name='confirm' component='div'></ErrorMessage>
                                )
                            }

                            {/*Age Field*/}
                            <label htmlFor='age'>Age</label>
                            <Field id='age' type='number' name='age' />
                            
                            {/*Age Errors*/}
                            {
                                errors.age && touched.age && (
                                    <ErrorMessage name='age' component='div'></ErrorMessage>
                                )
                            }   
                            {/* SUMBIT FORM*/}
                            <button type="submit">Register</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting? (<p>Send data to user...</p>):null
                            }
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default RegisterForm