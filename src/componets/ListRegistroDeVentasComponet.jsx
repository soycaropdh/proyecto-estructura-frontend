import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VentasService from "../services/VentasService";
import { Link } from 'react-router-dom';

const ListRegistroDeVentasComponent = () => {
  const [ventas, setVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //Estado para la barra de búsqueda

  useEffect(() => {
    listarVentas();
  }, []);

  const listarVentas = () => {
    VentasService.getAllVentas().then(response => {
      setVentas(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const deleteVenta = (ventaId) => {
    VentasService.deleteVenta(ventaId).then(response => {
      listarVentas();
    }).catch(error => {
      console.log(error);
    });
  }

  //Manejador de cambio en la entrada de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //se filtran por marca, fecha, precio, cantidad o valor total
  const filteredVentas = ventas.filter(venta =>
    venta.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venta.fecha.includes(searchTerm) ||
    venta.precio.toString().includes(searchTerm) ||
    venta.cantidad.toString().includes(searchTerm) ||
    venta.valortotal.toString().includes(searchTerm)
  );

  return (
    <div className='container'>
      <h2 colSpan="7" className= "title-background" >Lista Registro De Ventas</h2>
      
      <div className='row mb-3'>
        <div className='col-md-6'>
          <Link to='/add-cliente' className='btn btn-primary'>Agregar Venta</Link>
        </div>
        <div className='col-md-6'>
          <input
            type="text"
            className='form-control'
            placeholder="Buscar por marca, fecha, precio, cantidad o valor total"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="table table-secondary table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>CANTIDAD</th>
            <th>FECHA</th>
            <th>MARCA</th>
            <th>PRECIO</th>
            <th>VALOR TOTAL</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {filteredVentas.map(venta => (
            <tr key={venta.ventaId}>
              <td>{venta.ventaId}</td>
              <td>{venta.cantidad}</td>
              <td>{venta.fecha}</td>
              <td>{venta.marca}</td>
              <td>{venta.precio}</td>
              <td>{venta.valortotal}</td>
              <td>
                <Link className='btn btn-info' to={`/edit-venta/${venta.ventaId}`}>Editar</Link>
                <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteVenta(venta.ventaId)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListRegistroDeVentasComponent;
