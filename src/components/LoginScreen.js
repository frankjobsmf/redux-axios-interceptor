import React from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/auth';
import { useForm } from '../hooks/useForm';

const LoginScreen = () => {
    const dispatch = useDispatch();



    const [ value, handleInputChange ] = useForm({
        username: '',
        password: ''
    });

    const { username, password } = value;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( loginAction( username, password ));

        //vamos a realizar el login  para luego con el middleware, refrescar el token y realizar peticiones
    }

    return (
        <div>
            <form>
                <input 
                    type="text"
                    autoComplete="off"
                    name="username"
                    value={ username }
                    onChange={ handleInputChange }
                />
                <input 
                    type="password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    onClick={ handleLogin }
                >
                    Ingresar
                </button>
            </form>
        </div>
    )
}

export default LoginScreen;