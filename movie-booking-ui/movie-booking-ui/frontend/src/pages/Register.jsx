import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-gray-400 mt-2">Join CineBook today</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border-l-4 border-red-600 p-4 mb-6 rounded-r-md">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-400 text-sm mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required minLength={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-red-600 transition-colors" placeholder="Choose a username" />
          </div>
          <div className="mb-5">
            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-red-600 transition-colors" placeholder="Enter your email" />
          </div>
          <div className="mb-5">
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-red-600 transition-colors" placeholder="Create a password (min 6 chars)" />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 hover:translate-y-[-2px] transition-all shadow-lg shadow-red-600/20 cursor-pointer">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account? <Link to="/login" className="text-red-500 hover:text-red-400">Login</Link>
        </p>
      </div>
    </div>
  );
}
