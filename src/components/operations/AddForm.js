import React, { useState, useContext } from "react";
import { newOperationApi } from "../../api/operations";
import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

import Swal from "sweetalert2";

export default function AddForm(props) {
  const { history } = props;
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);

  const [operation, setOperation] = useState({
    name: "",
    price: "",
    date: "",
    type: "",
    userId: "",
  });

  const [error, setError] = useState(false);

  const { name, price, date, type } = operation;

  const addOperation = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" || price < 1 || isNaN(price) || 
      date.trim() === "" || type.trim() === ""
    ) {
      setError(true);
      return;
    }

    setError(false);

    operation.userId = auth.id;

    newOperationApi(operation)
      .then((data) => {
        setOperation({
          name: "",
          price: "",
          date: "",
          type: "",
          userId: "",
        });

        Swal.fire("Éxito!", "Se agregó la operación", "success");
        history.push("/");
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Hubo un Error",
          text: err,
        })
      );
  };

  return (
    <form onSubmit={addOperation}>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <legend>Registra una operación</legend>
      <div className="campo">
        <label>Concepto</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setOperation({ ...operation, name: e.target.value })}
          value={name}
        />
      </div>
      <div className="campo">
        <label>Monto</label>
        <input
          type="number"
          name="price"
          onChange={(e) =>
            setOperation({ ...operation, price: e.target.value })
          }
          value={price}
        />
      </div>
      <div className="campo">
        <label>Fecha</label>
        <input
          type="date"
          name="date"
          onChange={(e) => setOperation({ ...operation, date: e.target.value })}
          value={date}
        />
      </div>
      <div className="campo">
        <label>Tipo</label>
        <select
          onChange={(e) => setOperation({ ...operation, type: e.target.value })}
          name="type"
          value={type}
        >
          <option value="" disabled>
            Seleccione un tipo
          </option>
          <option value="Egreso">Egreso</option>
          <option value="Ingreso">Ingreso</option>
        </select>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary mr-4">
          Confirmar
        </button>
        <Link to={"/"} className="btn btn-secondary ">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
