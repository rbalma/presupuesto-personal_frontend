import React, { useState, useEffect } from 'react';
import { updateOperationApi, getOperationsByIdApi } from '../../api/operations';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';


export default function EditForm(props) {

    const { history } = props;
    const { id } = props.match.params;
    const [startDate, setStartDate] = useState(new Date());

    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        date: startDate,
        type: ""
      });

    useEffect(() => {
        getOperationsByIdApi(id)
        .then(data => {
            setInputs({
                name: data.name,
                price: data.price,
                date: data.date,
                type: data.type,
                id: data.id
            }) 
        });
    }, [id]);

   
   const addOperation = (e) => {

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
                      <Link to={"/"} className="btn btn-secondary mr-4">Cancelar</Link>
                      <button type="submit" className="btn btn-primary">Confirmar</button>
                    </form>
                  </div>
              </div>
            </div>



          </div>
        </div>

    )
}
