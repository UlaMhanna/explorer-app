'use client'; 
import { useEffect , useState} from "react";
import { Link } from "react-router-dom";


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}
const AllProducts = () => {
   const [products, setProducts] = useState<Product[]>([]);
   

   useEffect(()=>{

    fetch('https://fakestoreapi.com/products')
    .then(res => {
        if (!res.ok) throw new Error('Errorrrr');
        return res.json();
      })
      .then(data => {
         setProducts(data);
        console.log(data)
      })
      .catch(err => {

      });
   
    },[])


 
  return (
  
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

  {/* <h1> 
     Hello 
     
     </h1> */}
  <h1> 
Welcom TO OUR STORE     
     </h1>
     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product.id} className=" bg-gray-100group relative border border-gray-200 rounded-md shadow-sm p-4"
>
          <img
            src={product.image}
            alt={`${product.title}`}
  className="h-40 w-40 mx-auto rounded-md bg-gray-200 object-cover shadow-sm group-hover:opacity-75"
          />
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
               <Link to={`/product/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-lg  mt-1 font-medium text-green-900">${product.price}</p>

          </div>
        </div>
      ))}
    </div>
    </div>
    
     </div>
    );

};

export default AllProducts;