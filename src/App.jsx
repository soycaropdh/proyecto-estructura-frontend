import { useState } from 'react'
import ListRegistroDeVentasComponet from './componets/ListRegistroDeVentasComponet';
import HeaderComponet from './componets/HeaderComponet';
import FooterComponent from './componets/FooterComponent';
import './App.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddVentaComponent from './componets/AddVenteComponent';



function App() {
  return (
    <div>
      <BrowserRouter>
      <HeaderComponet/>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<ListRegistroDeVentasComponet />}></Route>
          <Route path='/ventas' element={<ListRegistroDeVentasComponet />}></Route>
          <Route path='/add-cliente' element={<AddVentaComponent/>}></Route>
          <Route path="/edit-venta/:id" element={<AddVentaComponent />} />
        </Routes>
      </div>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
