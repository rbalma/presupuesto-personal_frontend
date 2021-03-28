import React, { useState, useEffect} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



export default function Form() {

    useEffect(() => {
        fetchOperations();
    },[])

   


    const [startDate, setStartDate] = useState(new Date());
    const [operations, setOperations] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        date: startDate,
        type: ""
      });

   const addOperation = (e) => {
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
            type: ""
          }
       )
        })
       .catch(err => console.error(err));

       e.preventDefault();
       fetchOperations();

    }


    const fetchOperations = () => {
        fetch('http://localhost:3001/')
        .then(res => res.json())
        .then(data => {
            setOperations(data);
           
        })
        
    }

  
    return (
        
        <div className="container">
          <div className="row">

            <div className="col-5">
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
                      <DatePicker selected={startDate} name="date" onChange={date => setStartDate(date)} value={inputs.date}/>
                    </div>
                    <div className="form-group">
                      <label>Tipo</label>
                      <select className="form-control"
                      onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
                       name="type" value={inputs.type}>
                              <option value="ingreso">Ingreso</option>
                              <option value="egreso">Egreso</option>
                      </select>
                    </div>
                      <button type="submit" className="btn btn-primary">Confirmar</button>
                    </form>
                  </div>
              </div>
            </div>


            <div className="col-7">
                <table className="table">
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
                        </tr>

                   ))} 
                    </tbody>
                </table>
            </div>

          </div>
        </div>

    )
}
