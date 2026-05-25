import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function History() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/booking/history').then(res => setTickets(res.data));
  }, [user, navigate]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-8 pb-4 border-b border-white/10">My Bookings</h1>

      {tickets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl opacity-20 mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-gray-400">No tickets found</h3>
          <p className="text-gray-500 mt-2 mb-6">Looks like you haven't booked any movies yet.</p>
          <Link to="/" className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-all">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex gap-6 items-center shadow-xl hover:border-white/20 transition-colors">
              <img src={ticket.moviePosterUrl} alt={ticket.movieTitle} className="w-24 h-36 object-cover rounded-md shadow-lg" />

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-red-500">{ticket.movieTitle}</h2>
                    <p className="text-gray-400 text-sm">{ticket.theaterName}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-red-600/10 text-red-500 px-3 py-1 rounded-full text-xs font-semibold">CONFIRMED</span>
                    <p className="text-gray-500 text-xs mt-2">Booking #{ticket.id}</p>
                  </div>
                </div>

                <div className="flex gap-10 mt-4 bg-black/20 p-4 rounded-md">
                  <div>
                    <div className="text-gray-400 text-xs uppercase">Date & Time</div>
                    <div className="font-semibold">{formatDate(ticket.showTime)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase">Seats ({ticket.seatNumbers.length})</div>
                    <div className="font-semibold">{ticket.seatNumbers.join(', ')}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-gray-400 text-xs uppercase">Total Amount</div>
                    <div className="text-xl font-bold">₹{ticket.totalPrice.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
