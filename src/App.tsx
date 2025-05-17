
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AllProducts from './components/AllProducts';
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
//     <div className="App">
// <AllProducts/>
//     </div>


<Router> 
  <Routes>
    <Route path="*" element={<AllProducts />} />
    <Route path='/products' element = {<AllProducts/>}/>
    <Route path='/product/:id' element={<ProductDetails/> }/>
  </Routes>
</Router>
  );
}

export default App;
