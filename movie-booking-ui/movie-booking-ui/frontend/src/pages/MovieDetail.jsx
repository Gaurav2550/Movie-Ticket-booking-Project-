import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    api.get(`/movies/${id}`).then(res => setMovie(res.data));
    api.get(`/shows/movie/${id}`).then(res => setShows(res.data));
  }, [id]);

  if (!movie) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex gap-10 shadow-2xl">
        <img src={movie.posterUrl} alt={movie.title} className="w-[300px] rounded-lg shadow-2xl object-cover" />

        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>
          <div className="flex gap-3 text-gray-400 mb-6">
            <span>{movie.genre}</span>
            <span>•</span>
            <span>{movie.durationMinutes} mins</span>
            <span>•</span>
            <span>{movie.language}</span>
          </div>

          <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">{movie.description}</p>

          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Available Shows</h3>

          {shows.length === 0 ? (
            <p className="text-gray-400 py-4">No shows available for this movie at the moment.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {shows.map(show => (
                <div key={show.id} className="bg-white/[0.03] p-5 rounded-lg border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors">
                  <div>
                    <strong className="text-red-500 text-lg block">{show.theaterName}</strong>
                    <span className="text-gray-400 text-sm">{formatDate(show.showTime)}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold mb-2">₹{show.ticketPrice.toFixed(2)}</div>
                    <Link to={`/shows/${show.id}`} className="inline-block bg-red-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors">
                      Select Seats
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
