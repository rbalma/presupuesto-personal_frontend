import React, { useState, useEffect } from "react";
import { updateOperationApi, getOperationsByIdApi } from "../../api/operations";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

export default function EditForm(props) {
  const { history } = props;
  const { id } = props.match.params;

  const [operation, setOperation] = useState({
    name: "",
    price: "",
    date: "",
  });

  const [error, setError] = useState(false);

  const { name, price, date } = operation;

  useEffect(() => {
    getOperationsByIdApi(id).then((data) => {
      setOperation({
        name: data.name,
        price: data.price,
        date: data.date,
      });
    });
  }, [id]);

  const editOperation = (e) => {
    e.preventDefault();

    if (name.trim() === "" || price < 1 || isNaN(price) || date.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    updateOperationApi(operation, id).then((data) => {
      setOperation({
        name: "",
        price: "",
        date: "",
      });

      Swal.fire("Éxito!", "Se editó la operación", "success");
      history.push("/");
    });
  };

  return (
    <form onSubmit={editOperation}>
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
