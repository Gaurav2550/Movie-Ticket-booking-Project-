import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0f1014]/80 backdrop-blur-lg border-b border-white/10">
      <Link to="/" className="text-2xl font-extrabold text-red-600 tracking-wide hover:text-red-500 transition-colors">
        CineBook
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white font-medium hover:text-red-500 transition-colors">Home</Link>
        {!user ? (
          <>
            <Link to="/login" className="px-4 py-2 border border-red-600 text-red-500 rounded-md font-semibold hover:bg-red-600 hover:text-white transition-all">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 hover:translate-y-[-2px] transition-all shadow-lg shadow-red-600/20">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/history" className="text-red-400 font-medium hover:text-red-300 transition-colors">My Tickets</Link>
            <span className="text-gray-400">Welcome, <span className="text-white font-semibold">{user.username}</span></span>
            <button onClick={logout} className="px-4 py-2 border border-red-600 text-red-500 rounded-md font-semibold hover:bg-red-600 hover:text-white transition-all cursor-pointer">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
