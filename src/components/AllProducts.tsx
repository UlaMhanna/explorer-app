'use client'; 
import { useEffect , useMemo, useState} from "react";
import { useSearchParams, Link } from "react-router-dom";
import debounce from "lodash.debounce";


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}
const AllProducts = () => {
   const [products, setProducts] = useState<Product[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
  const searchProduct = searchParams.get("search") || "";


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


   const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

const debouncedSearch = useMemo(
  () =>
    debounce((value: string) => {
      if (value) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    }, 200),
  [setSearchParams]
);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(e.target.value);

  };

    useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);


  return (
  
<div className="bg-white  items-center px-4 py-16">
                <h1 className=" text-center"> 
WELCOME TO OUR STORE     
     </h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        
        <div className=" relative  flex items-center rounded-md bg-white pl-3 order">


     <input
            id="searchProduct"
            name="searchProduct"
            type="text"
            placeholder="search for any product"
             value={searchProduct}
        onChange={handleSearchChange}
              className="
    block
    w-full
    rounded-md
    border
    border-gray-300
    bg-white
    py-2
    px-3
    text-base
    text-gray-900
    placeholder-gray-400
    focus:border-gray-700
    focus:ring-1
    focus:ring-gray-500
    focus:outline-none
    sm:text-sm
  "
          />
  <svg
    className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35m1.57-5.16a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
          </div>

     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {filteredProducts.map((product) => (
        <div key={product.id} className=" bg-gray-100 group relative border border-gray-200 rounded-md shadow-sm p-4"
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