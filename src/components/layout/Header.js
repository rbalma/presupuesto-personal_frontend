import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';
import { withRouter } from 'react-router-dom';

const Header = (props) => {

    const [auth, setAuth] = useContext(CRMContext);

    const logout = () => {
        setAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        props.history.push('/login');
    }

return (
        <header className="barra">
            <div className="container">
                <div className="contenido-barra">
            <h1>
                <Link to={"/"} className="text-decoration-none">
                    Presupuesto Personal
                </Link>
            </h1>

            {auth.auth ? ( 
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={logout}
                >
                <i className="bi bi-reply-all"></i> Cerrar Sesión
                </button>
            ) : null}

            </div>
            </div>
        </header>
)};
 
export default withRouter(Header);