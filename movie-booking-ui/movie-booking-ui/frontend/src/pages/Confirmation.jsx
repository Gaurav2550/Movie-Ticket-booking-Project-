import { useLocation, Link } from 'react-router-dom';

export default function Confirmation() {
  const { state } = useLocation();
  const ticket = state?.ticket;

  if (!ticket) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">No booking data found.</p>
      <Link to="/" className="text-red-500 hover:text-red-400">Go Home</Link>
    </div>
  );

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl text-center border-t-4 border-t-emerald-500">

        <div className="text-6xl text-emerald-500 mb-4">✓</div>
        <h1 className="text-3xl font-bold text-emerald-500 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-400 mb-8">Thank you for your purchase.</p>

        <div className="bg-black/30 p-6 rounded-lg text-left mb-8">
          <h3 className="font-semibold mb-4 pb-2 border-b border-dashed border-white/10">
            Ticket Details #{ticket.id}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-xs uppercase">Movie</p>
              <p className="font-semibold">{ticket.movieTitle}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Theater</p>
              <p className="font-semibold">{ticket.theaterName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Date & Time</p>
              <p className="font-semibold">{formatDate(ticket.showTime)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Seats</p>
              <p className="font-semibold text-red-500">{ticket.seatNumbers.join(', ')}</p>
            </div>
            <div className="col-span-2 border-t border-dashed border-white/10 pt-4 mt-2 flex justify-between items-center">
              <span className="text-gray-400">Total Paid:</span>
              <span className="text-2xl font-extrabold">₹{ticket.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/" className="px-6 py-3 border border-red-600 text-red-500 rounded-md font-semibold hover:bg-red-600 hover:text-white transition-all">
            Back to Home
          </Link>
          <Link to="/history" className="px-6 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-all">
            View All Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
