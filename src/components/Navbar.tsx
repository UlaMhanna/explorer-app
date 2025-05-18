import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4 flex justify-between items-center">
              <div className="text-white font-bold text-xl space-x-8">

      <Link to="/">Home</Link>
      <Link to="/favorites" className="pl-15 ">
        Favorites ♥
      </Link>
      </div>
    </nav>
  );
}