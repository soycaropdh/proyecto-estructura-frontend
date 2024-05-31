import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VentasService from "../services/VentasService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddVentaComponent = () => {
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      VentasService.getVentaById(id).then((response) => {
        setCantidad(response.data.cantidad);
        setFecha(response.data.fecha);
        setMarca(response.data.marca);
        setPrecio(response.data.precio);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [id]);

  const saveOrUpdateVenta = async (e) => {
    e.preventDefault();
  
    const venta = { cantidad, fecha, marca, precio };

    try {
      if (id) {
        const response = await VentasService.updateVenta(id, venta);
        console.log(response.data);
        navigate('/ventas');
      } else {
        const response = await VentasService.createVenta(venta);
        console.log(response.data);
        navigate('/ventas');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const title = () => {
    return id ? <h2 className='text-center'> Actualizar Venta </h2> : <h2 className='text-center'> Agregar Venta </h2>;
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            {title()}
            <div className='card-body'>
              <form onSubmit={saveOrUpdateVenta}>
                <div className='form-group mb-2'>
                  <label className='form-label'>Cantidad</label>
                  <input
                    type='number'
                    placeholder='Digite aquí'
                    name='cantidad'
                    className='form-control'
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Fecha</label>
                  <input
                    type='date'
                    placeholder='Ingrese la Fecha'
                    name='fecha'
                    className='form-control'
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className='form-label'>Marca</label>
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {marca || "Seleccionar"}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Adidas')}>Adidas</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Verlon')}>Verlon</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Nike')}>Nike</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Handalias')}>Handalias</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Jordan')}>Jordan</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('New Balance')}>New Balance</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Puma')}>Puma</a>
                      <a className="dropdown-item" href="#" onClick={() => setMarca('Otras')}>Otras</a>
                    </div>
                  </div> 
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Precio</label>
                  <input
                    type='number'
                    placeholder='Ingrese el Precio'
                    name='precio'
                    className='form-control'
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </div>
                <button type="submit" className='btn btn-success'>
                  {id ? "Actualizar Venta" : "Registrar Venta"}
                </button>
                &nbsp; &nbsp;
                <Link to='/ventas' className='btn btn-danger'>Cancelar</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVentaComponent;
