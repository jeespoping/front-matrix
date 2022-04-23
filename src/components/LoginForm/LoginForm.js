import React from 'react';
import { useDispatch } from 'react-redux';
import {Form, Button} from 'semantic-ui-react';
import { startLogin } from '../../actions/auth';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './LoginForm.scss';

export default function LoginForm() {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            Codigo: Yup.number('Debes ingresar un código válido').required('El código es requerido'),
            Password: Yup.string().required('La contraseña es requerida')
        }),
        onSubmit: (formData) => {
            dispatch(startLogin(formData))
        }
    })

    const dispatch = useDispatch();

    return (
        <Form
            className="login-form"
            onSubmit={formik.handleSubmit}
        >
            <h1>Iniciar sesión</h1>

            <div className="input-box">
                <input 
                    type="text"
                    name="Codigo"
                    value={formik.values.Codigo}
                    onChange={formik.handleChange}    
                    required              
                />
                <label>Ingresa tu código</label>
            </div>

            <div className="input-box">
                <input  
                    name="Password"
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    type="password"
                    required
                />
                <label>Ingresa tu contraseña</label>
            </div>

            <Button
                type="submit"
                className="btn-submit"
            >Entrar</Button>
            
        </Form>
    )
}

function initialValues() {
    return {
        Codigo: "",
        Password: ""
    }
}