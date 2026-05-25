import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function SeatSelection() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/shows/${id}`).then(res => setShow(res.data));
    api.get(`/shows/${id}/seats`).then(res => setSeats(res.data));
  }, [id]);

  const toggleSeat = (seatNumber, booked) => {
    if (booked) return;
    setSelected(prev =>
      prev.includes(seatNumber) ? prev.filter(s => s !== seatNumber) : [...prev, seatNumber]
    );
  };

  const handleBooking = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      const res = await api.post('/booking/confirm', { showId: Number(id), seatNumbers: selected });
      navigate('/confirmation', { state: { ticket: res.data } });
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  if (!show) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  const totalPrice = (selected.length * show.ticketPrice).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex gap-8">
      {/* Seat Map */}
      <div className="flex-[2] bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl">
        {error && (
          <div className="bg-red-900/30 border-l-4 border-red-600 p-4 mb-6 rounded-r-md">
            <p className="text-red-300">{error}</p>
          </div>
        )}
        <h2 className="text-2xl font-bold text-center mb-8">Select Your Seats</h2>

        {/* Screen */}
        <div className="w-full h-14 bg-gradient-to-b from-white/40 to-transparent rounded-t-[50%_10px] mb-12 relative" style={{ transform: 'perspective(200px) rotateX(-5deg)' }}>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[5px]">SCREEN</span>
        </div>

        {/* Seats Grid */}
        <div className="grid grid-cols-10 gap-2.5 max-w-[550px] mx-auto">
          {seats.map(seat => (
            <button
              key={seat.id}
              onClick={() => toggleSeat(seat.seatNumber, seat.booked)}
              disabled={seat.booked}
              title={seat.seatNumber}
              className={`aspect-square rounded-t-lg rounded-b-sm relative transition-all duration-200 cursor-pointer
                ${seat.booked
                  ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                  : selected.includes(seat.seatNumber)
                    ? 'bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.5)] scale-105'
                    : 'bg-white/10 hover:bg-white/30 hover:scale-110'
                }`}
            >
              <div className="absolute bottom-0 left-[15%] w-[70%] h-[20%] bg-black/30 rounded-sm" />
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-10">
          {[['bg-white/10', 'Available'], ['bg-red-600', 'Selected'], ['bg-gray-700 opacity-50', 'Booked']].map(([cls, label]) => (
            <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
              <div className={`w-5 h-5 rounded ${cls}`} /> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl h-fit sticky top-24">
        <h3 className="text-lg font-semibold pb-4 mb-4 border-b border-white/10">Booking Summary</h3>

        <div className="mb-6">
          <h4 className="text-red-500 font-semibold mb-1">{show.movieTitle}</h4>
          <p className="text-gray-400 text-sm">{show.theaterName}</p>
          <p className="text-gray-400 text-sm">
            {new Date(show.showTime).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Selected Seats</span>
          <span className="font-semibold">{selected.length > 0 ? selected.join(', ') : 'None'}</span>
        </div>
        <div className="flex justify-between mb-6 pb-4 border-b border-white/10">
          <span className="text-gray-400">Price per Ticket</span>
          <span className="font-semibold">₹{show.ticketPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-8 text-xl font-extrabold">
          <span>Total Amount</span>
          <span className="text-red-500">₹{totalPrice}</span>
        </div>

        <button onClick={handleBooking} disabled={selected.length === 0}
          className="w-full bg-red-600 text-white py-3.5 rounded-md text-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-red-600/20">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
