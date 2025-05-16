'use client'; 
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);


  
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

  return (
       <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex-shrink-0 w-full lg:w-1/3">
           <img src={product?.image} alt={` ${product?.title}`} 
            className="w-full h-64 object-contain rounded-md border border-gray-300 shadow-md"/>
        </div>
        </div>
      {/* <h1> Product Details #{id}</h1> */}
         <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.title}</h1>
          </div>
</div>
<div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product?.description}</p>
              </div>
            </div>
    </div>
  );
};

export default ProductDetails;