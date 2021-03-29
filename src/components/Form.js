import React, { useState, useEffect} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';


export default function Form() {

    const [startDate, setStartDate] = useState(new Date());
    const [ingresos, setIngresos] = useState(0);
    const [egresos, setEgresos] = useState(0);
    const [operations, setOperations] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        date: startDate,
        type: ""
      });

      useEffect(() => {
        fetchOperations();
        fetchIngresos();
        fetchEgresos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const fetchIngresos = () => {
        fetch('http://localhost:3001/ingresos')
        .then(res => res.json())
        .then(data => {
            setIngresos(data.ingreso);           
        })
    }


    const fetchEgresos = () => {
        fetch('http://localhost:3001/egresos')
        .then(res => res.json())
        .then(data => {
            setEgresos(data.egreso);           
        })
    }

   const addOperation = (e) => {
        if(inputs.id){
            fetch( `http://localhost:3001/editar/${inputs.id}`,{
                method: 'PUT',
                body: JSON.stringify(inputs),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                setInputs(
                    {
                        name: "",
                        price: "",
                        date: startDate,
                        type: "",
                        id: ""
                      }
            )
            fetchOperations();
            fetchIngresos();
            fetchEgresos();
            Swal.fire(
                'Éxito!',
                'Se editó la operación',
                'success'
              )
        })

        } else {
            fetch('http://localhost:3001/', {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
            setInputs(
             {
                 name: "",
                 price: "",
                 date: startDate,
                 type: "",
                 id: ""
               }
            )
            fetchOperations();
            fetchIngresos();
            fetchEgresos();
            Swal.fire(
                'Éxito!',
                'Se agregó la operación',
                'success'
              )
             })
            .catch(err => 
                Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: err
                }));
        }
       e.preventDefault();
       
    }


    const fetchOperations = () => {
        fetch('http://localhost:3001/')
        .then(res => res.json())
        .then(data => {
            setOperations(data);
           
        })
    }

    const deleteOperation = (id) => {
        fetch( `http://localhost:3001/delete/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            fetchOperations();
            fetchIngresos();
            fetchEgresos();
            Swal.fire(
                'Éxito!',
                'Se borro la operación',
                'success'
              )
        });
    }

    const editOperation = (id) => {
        fetch( `http://localhost:3001/${id}`)
        .then(res => res.json())
        .then(data => {
            
            setInputs({
                name: data.name,
                price: data.price,
                date: data.date,
                type: data.type,
                id: data.id
            }) 
        }) 
    }

  
    return (
        
        <div className="container">
          <div className="row mt-4">

            <div className="col-md-5 col-xs-12">
              <div className="card">
                  <div className="card-body">
                    <form onSubmit={addOperation}>
                    <div className="form-group">
                      <label>Concepto</label>
                      <input type="text" name="name" 
                      onChange={(e) => setInputs({ ...inputs, name: e.target.value })} className="form-control" placeholder="" value={inputs.name} />
                    </div>
                    <div className="form-group">
                      <label>Monto</label>
                      <input type="number" name="price"
                       onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
                      className="form-control" placeholder="" value={inputs.price} />
                    </div>
                    <div className="form-group">
                      <DatePicker selected={startDate} name="date" onChange={date => {setStartDate(date);
                      setInputs({ ...inputs, date: date })
                      }} value={inputs.date}/>
                    </div>
                    <div className="form-group">
                      <label>Tipo</label>
                      <select className="form-control"
                      onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
                       name="type" value={inputs.type}>
                              <option>Seleccione un tipo</option>
                              <option value="egreso">Egreso</option>
                              <option value="ingreso">Ingreso</option>
                      </select>
                    </div>
                      <button type="submit" className="btn btn-primary">Confirmar</button>
                    </form>
                  </div>
              </div>
            </div>


            <div className="col-md-7 col-xs-12 mt-2">
            <h3>Balance Actual: {ingresos - egresos}</h3>
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Concepto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                   {operations.map(operacion => (
                    

                        <tr key={operacion.id}>
                            <td>{operacion.name}</td>
                            <td>{operacion.price}</td>
                            <td>{operacion.type}</td>
                            <td>
                                <button className="btn btn-success mr-2" onClick={() => editOperation(operacion.id)} >
                                    Editar
                                </button>
                                <button className="btn btn-danger mr-2" onClick={() => deleteOperation(operacion.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    
                   ))} 
                    </tbody>
                </table>
            </div>

          </div>
        </div>

    )
}
