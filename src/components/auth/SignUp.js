import React, { useState } from 'react';
import { newUserApi } from '../../api/user';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = (props) => {

   
    const [error, setError] = useState(false);

    const [ user, setUser ] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
    });

    const { name, lastname, email, password } = user;

    const setState = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const addUser = (e) => {
        e.preventDefault();

        if(name.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === ''){
            setError(true);
            return;
          }
      
        setError(false);

        newUserApi(user)
            .then(data => {
                setUser({
                    name: '',
                    lastname: '',
                    email: '',
                    password: ''
                })
            Swal.fire(
                'Éxito!',
                'Se creó el usuario',
                'success'
              )
              props.history.push('/');
             })
            .catch(err => 
                Swal.fire({
                type: 'error',
                title: 'Hubo un Error',
                text: err
                }));

    }

    return (
        <div>

        <form onSubmit={addUser}>
        {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <legend>Registra un Nuevo Usuario</legend>

        <div className="campo">
            <label>Nombre: </label>
            <input type="text" name="name" onChange={setState} value={name} />
        </div>

        <div className="campo">
            <label>Apellido: </label>
            <input type="text" name="lastname" onChange={setState} value={lastname} />
        </div>

        <div className="campo">
            <label>Email: </label>
            <input type="email" name="email" onChange={setState} value={email} />
        </div>

        <div className="campo">
            <label>Contraseña: </label>
            <input type="password" name="password" onChange={setState} value={password} />
        </div>

        <div className="text-center">
        <input type="submit" value="Registrarse" className="btn btn-success btn-block mb-4" />
        <Link to={"/login"} className="text-text-info text-decoration-none">¿Ya tienes una cuenta? Ingresa ahora</Link>
        </div>

        </form>


        </div>
     );
}
 
export default withRouter(SignUp);