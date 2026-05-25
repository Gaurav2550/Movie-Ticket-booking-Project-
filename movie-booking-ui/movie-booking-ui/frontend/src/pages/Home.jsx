import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies').then(res => setMovies(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-red-600">CineBook</span>
        </h1>
        <p className="text-gray-400 text-xl">Book tickets for the latest movies playing near you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie, i) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 hover:translate-y-[-10px] hover:shadow-2xl transition-all duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-[380px] object-cover" />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{movie.genre} • {movie.durationMinutes} mins</p>
              <span className="mt-auto block text-center bg-red-600 text-white py-3 rounded-md font-semibold group-hover:bg-red-700 transition-colors">
                Book Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
