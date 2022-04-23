import {httpConToken, httpSinToken} from '../helpers/http';
import { types } from '../types/types';
import { setToken } from '../utils/token';
import Swal from 'sweetalert2';

export const startLogin = (formData) => {
    return async (dispatch) => { 
        try {
            const {data} = await httpSinToken.post('/login', formData);


            if(data.res){
                setToken(data.acces_token);
    
                dispatch(Login({
                    user: {
                        ...data.user,
                    },
                    res: data.res
                }))
            } 
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Código o Contraseña inválida', 'error');
        }
        
    }
}

export const startChecking = () => {
    
    return async (dispatch) => {
        try {
            const {data} = await httpConToken.get('/validartoken');                         
            dispatch(Login(data));
        } catch (error) {
            dispatch(checkingFinish());
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(Logout());
    }
}

const checkingFinish = () => ({type: types.authCheckingFinish});

const Login = (user) => ({
    type: types.authLogin,
    payload: user
})

const Logout = () => ({
    type: types.authLogout
})