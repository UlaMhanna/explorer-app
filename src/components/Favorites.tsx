import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;}
  

interface Props {
  allProducts: Product[];
}

const Favorites: React.FC<Props> = ({ allProducts }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
      console.log('Favorites from localStorage:', saved);

    setFavoriteIds(saved);
  }, []);

  console.log('All products:', allProducts);
console.log('Favorite Ids:', favoriteIds);

  const favoriteProducts = allProducts.filter(p => favoriteIds.includes(p.id));
console.log('Favorite products:', favoriteProducts);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
      {favoriteProducts.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="grid gap-4">
          {favoriteProducts.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="block bg-white p-4 border rounded shadow hover:shadow-md transition"
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
      )}
    </div>
  );
};

export default Favorites;