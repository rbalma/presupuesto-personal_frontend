import React, { useState} from 'react';
import { updateOperationApi, newOperationApi } from '../../api/operations';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';


export default function AddForm(props) {

    const { history } = props;

    const [startDate, setStartDate] = useState(new Date());

    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        date: startDate,
        type: ""
      });


   const addOperation = (e) => {

        if(inputs.id){
            updateOperationApi(inputs, inputs.id)
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

            Swal.fire(
                'Éxito!',
                'Se editó la operación',
                'success'
              );
              history.push('/');
        })

        } else {
          newOperationApi(inputs)
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

            Swal.fire(
                'Éxito!',
                'Se agregó la operación',
                'success'
              )
              history.push('/');
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

    return (
        
        <div className="container">
          <div className="row mt-4">

            <div className="col-md-6 col-xs-12">
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
                              <option value="Egreso">Egreso</option>
                              <option value="Ingreso">Ingreso</option>
                      </select>
                    </div>
                      <button type="submit" className="btn btn-primary mr-4">Confirmar</button>
                      <Link to={"/"} className="btn btn-secondary ">Cancelar</Link>
                    </form>
                  </div>
              </div>
            </div>



          </div>
        </div>

    )
}
