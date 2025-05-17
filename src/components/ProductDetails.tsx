'use client'; 
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
const location = useLocation();
const navigate = useNavigate();


  
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log("produ details",data)
      })
      .catch((error) => {
        console.error("ُErrooorr", error);
      });
  }, [id]);

  const handleBack = () => {
  navigate(`/products${location.search}`);
  
};

 return product ?  (
     <div className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-contain rounded-lg border border-gray-200 shadow"
              />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">
            {product.description}</p>

                 <div className="text-2xl font-bold text-green-600 mb-6">${product.price}</div>

          <div className="text-lg font-semibold text-gray-900 mb-4">
            Category: <span className="text-indigo-600 capitalize">{product.category}</span>
              </div>

          <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200">
            Add to Cart
          </button>
        </div> 
        <button
            onClick={handleBack}
            className="mt-6 text-indigo-600 hover:underline"
          >
  ← Back to Products
</button>


      </div>
    </div> ) :    <div className="text-center py-20 text-gray-600">Loading product details...</div>;


 
};

export default ProductDetails;