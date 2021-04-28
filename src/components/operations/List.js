import React, { useState, useEffect } from 'react';
import { getOperationsApi, getUsersPricesApi, deleteOperationApi } from '../../api/operations';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import './List.css';

export default function List() {

    const [ingresos, setIngresos] = useState(0);
    const [egresos, setEgresos] = useState(0);
    const [operations, setOperations] = useState([]);
    const [reload, setReload] = useState(false);

    
    useEffect(() => {
       getUsersPricesApi('Ingreso').then( data => {
           setIngresos(data);
       });
       getUsersPricesApi('Egreso').then( data => {
        setEgresos(data);
        });
        getOperationsApi().then(data => {
            setOperations(data);
        });

        setReload(false);

    },[reload]);


    const deleteOperation = (id) => {
       
            Swal.fire({
                title: 'Eliminando Presupuesto',
                text: '¿Estas seguro que quieres eliminarlo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                deleteOperationApi(id).then(data => {
                    Swal.fire(
                        'Éxito!',
                        'Se eliminó el presupuesto',
                        'success'
                      )
                })
                setReload(true);
                }
              });
    }

    return (
        <div className="col-md-12 col-xs-12 mt-2">
        <h3>Balance Actual: {ingresos - egresos}</h3>

       <Link to={"/addForm"} className="btn btn-primary boton">Agregar presupuesto</Link>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Concepto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
               {operations.map(operacion => (            
                    <tr key={operacion.id}>
                        <td>{operacion.name}</td>
                        <td>{operacion.price}</td>
                        <td>{operacion.type}</td>
                        <td>
                            <Link to={`/editForm/${operacion.id}`} className="btn btn-success mr-2"><i className="bi bi-pencil-square"></i></Link>
                            <button className="btn btn-danger mr-2" title="Eliminar" onClick={() => deleteOperation(operacion.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                
               ))} 
                </tbody>
            </table>
        </div>
    )
}
