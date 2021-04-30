import React, {useContext, useState} from 'react';
import { loginApi } from '../../api/user';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const Login = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useContext(CRMContext);

    const [ inputs, setInputs ] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(false);

    const setData = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const { email, password } = inputs;

    const login = (e) => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            setError(true);
            return;
          }
      
            setError(false);

           loginApi(inputs)
           .then(data => {

            const token = data.token;
            const id = data.id;
            localStorage.setItem('token', token);

            setAuth({
                token,
                auth: true,
                id 
            })
 
            Swal.fire(
                 'Login correcto',
                 'Has iniciado sesión',
                 'success'
            );
 
            props.history.push("/");
           })
            .catch (error => {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: error
            })
        })
    }
    
    return ( 
        <div >
           

                <form onSubmit={login}>
                <legend>Iniciar Sesión</legend>
                {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={setData}
                            value={email}
                        />
                    </div>

                    <div className="campo">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            onChange={setData} 
                            value={password}
                        />
                    </div>

                    <div className="text-center">
                    <input type="submit" value="Iniciar Sesión" className="btn btn-success btn-block mb-4" />
                    <Link to={"/sign-up"} className="text-text-info text-decoration-none">¿No tienes cuenta? Registrate ahora</Link>
                    </div>
                </form>
            </div>
     );
}
 
export default withRouter(Login);