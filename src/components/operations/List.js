import React, { useState, useEffect, useContext } from "react";
import { getUsersPricesApi, deleteOperationApi, getOperationsApi } from "../../api/operations";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { checkPresupuesto } from "../../helpers";
import { CRMContext } from "../../context/CRMContext";
import moment from "moment";

export default function List(props) {
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [operations, setOperations] = useState([]);
  const [reload, setReload] = useState(false);
  const [type, setType] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);

  let presupuesto = ingresos - egresos;

  useEffect(() => {
    if (auth.token !== "") {
      const userId = auth.id;
      getUsersPricesApi(auth.token, "Ingreso", userId).then((data) => {
        setIngresos(data);
      });
      getUsersPricesApi(auth.token, "Egreso", userId).then((data) => {
        setEgresos(data);
      });
      getOperationsApi(auth.token, type, userId).then((data) => {
        setOperations(data);
      });
      setReload(false);
    } else {
      props.history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  if (!auth.auth) {
    props.history.push("/login");
  }

  const deleteOperation = (id) => {
    Swal.fire({
      title: "Eliminando Operación",
      text: "¿Estas seguro que quieres eliminarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOperationApi(auth.token, id).then((data) => {
          Swal.fire("Éxito!", "Se eliminó la operación", "success");
        });
        setReload(true);
      }
    });
  };

  const reloading = (type) => {
    setType(type);
    setReload(true);
  };

  return (
    <div className="col-md-12 col-xs-12 mt-2 text-center">
      <div className={checkPresupuesto(presupuesto)}>
        <h4>Balance Actual: $ {presupuesto}</h4>
      </div>
      <div className="row ">
        <div className="col-md-2 mb-2 d-flex text-left">
          <h5 className="text-white mr-2">Tipo</h5>
          <select
            onChange={(e) => reloading(e.target.value)}
            name="type"
            className="custom-select custom-select-sm"
          >
            <option value="">Todos</option>
            <option value="Egreso">Egreso</option>
            <option value="Ingreso">Ingreso</option>
          </select>
        </div>

        <div className="col-md-10 text-right ">
          <Link to={"/addForm"} className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Agregar Operación
          </Link>
        </div>
      </div>

      <div className="table-responsive-sm">
        <table className="table table-striped table-dark table-bordered mt-4">
          <thead className="thead-light">
            <tr>
              <th scope="col">Concepto</th>
              <th scope="col">Fecha</th>
              <th scope="col">Precio</th>
              <th scope="col">Tipo</th>
              <th colSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {operations.length === 0 ? (
              <tr>
                <td className="text-center p-4" colSpan="6">
                  No existen operaciones cargadas
                </td>
              </tr>
            ) : null}

            {operations.map((operacion) => (
              <tr key={operacion.id}>
                <td>{operacion.name}</td>
                <td>
                  {moment(operacion.date).format("DD")}/
                  {moment(operacion.date).format("MM")}/
                  {moment(operacion.date).format("YYYY")}
                </td>
                <td>{operacion.price}</td>
                <td>{operacion.type}</td>
                <td>
                  <Link
                    to={`/editForm/${operacion.id}`}
                    className="btn btn-success mr-2"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <button
                    className="btn btn-danger m-2"
                    title="Eliminar"
                    onClick={() => deleteOperation(operacion.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
