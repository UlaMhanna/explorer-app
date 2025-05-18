
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import AllProducts from './components/AllProducts';
import ProductDetails from "./components/ProductDetails";
import Favorites from './components/Favorites';
import { Navbar } from "./components/Navbar";


function App() {


  const [favorites, setFavorites] = React.useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  
  return (
<Router> 
  <Navbar />
  <Routes>
    <Route path="*" element={<AllProducts />} />
    <Route path='/products' element = {<AllProducts/>}/>
    <Route path="/products/:id" element={<ProductDetails />} /> 
    <Route path="/Favorites" element={<Favorites allProducts={[]} />} />
  </Routes>
</Router>
  );
}

export default App;
