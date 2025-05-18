'use client'; 
import { useEffect , useMemo, useState} from "react";
import { useSearchParams, Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { ChevronDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "./Pagination";
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

 import { useNavigate } from "react-router-dom";



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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortOption, setSortOption] = useState<string>(""); 
  const [showDropdown, setShowDropdown] = useState(false);

const [categories, setCategories] = useState<string[]>([]);
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [minPrice, setMinPrice] = useState<number | ''>('');
const [maxPrice, setMaxPrice] = useState<number | ''>('')
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);;


useEffect(() => {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => setCategories(data));
}, []);

const navigate = useNavigate();
const handleViewDetails = (id: number) => {
navigate(`/products/${id}?search=${searchProduct}&sort=${sortOption}`);
};  



   useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // clear previous errors if any

    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Errorrrr');

      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);



useEffect(() => {
  setCurrentPage(1);
}, [searchProduct, selectedCategories, minPrice, maxPrice]);


    

  const filteredSearchProducts = products.filter((p) => {
  const matchesSearch = p.title.toLowerCase().includes(searchProduct.toLowerCase());
  const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
  const matchesPrice =
    (minPrice === '' || p.price >= minPrice) &&
    (maxPrice === '' || p.price <= maxPrice);

  return matchesSearch && matchesCategory && matchesPrice;
});

  const sortedProducts = useMemo(() => {
  let sorted = [...filteredSearchProducts];

  switch (sortOption) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }

  return sorted;
}, [filteredSearchProducts, sortOption]);


    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};


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


const toggleCategory = (category: string) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(c => c !== category)
      : [...prev, category]
  );
};

  return (
  
<div className="bg-white px-4 py-16">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-center text-2xl font-bold mb-8">
      WELCOME TO OUR STORE
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end mb-10">

      <div className="relative">
        <input
          type="text"
          placeholder="Search for  product"
          value={searchProduct}
          onChange={handleSearchChange}
          className="w-full rounded border border-gray-300 px-4 py-2 text-sm "
        />
        <MagnifyingGlassIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"  />
      </div>

      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full rounded border text-gray-400 border-gray-300 px-4 py-2 text-sm bg-white appearance-none pr-10"
        >
          <option value ="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A–Z</option>
          <option value="title-desc">Title: Z–A</option>
        </select>
        <ArrowsUpDownIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
<div className="relative">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="w-full flex justify-between items-center border border-gray-300 px-4 py-2 text-sm rounded bg-white"
  >
    <span className="font-small text-gray-400">Filters</span>
                <FunnelIcon aria-hidden="true" className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
  </button>

  {showDropdown && (
    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 shadow-md rounded-lg p-4 space-y-4">
      
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <label key={category} className="text-sm capitalize">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="mr-1"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border px-2 py-1 rounded text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || '')}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border px-2 py-1 rounded text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || '')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t">
        <button
          className="text-sm text-gray-600 hover:underline"
          onClick={() => {
            setSelectedCategories([]);
            setMinPrice('');
            setMaxPrice('');
            setShowDropdown(false);
          }}
        >
          Clear
        </button>
        <button
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => setShowDropdown(false)}
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>
    </div>

    {loading ? (
      <div className="flex justify-center items-center py-10">

  <svg className="animate-spin h-6 w-6 text-gray-600" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
</div>
    ) : error ? (
      <div className="bg-red-100 text-red-700 p-4 rounded-md text-sm">
        {error}
      </div>
    ) : ( 
    <div>

   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {paginatedProducts.map((product) => (
        <Link
          key={product.id}
  to={`/products/${product.id}?search=${searchProduct}&sort=${sortOption}`}
          className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full object-contain mb-4"
          />
          <h3 className="text-sm font-medium">{product.title}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
          <p className="text-lg font-bold text-green-700 mt-2">${product.price}</p>
        </Link>
      ))}
    </div>

    <div className="mt-10">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
     </div>
    )}
  </div>
</div>
    );

};

export default AllProducts;