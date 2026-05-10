import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useTravelContext();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: '1',
      name: formData.name || 'Travel Enthusiast',
      email: formData.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    });
    navigate('/app');
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <MapPin className="text-indigo-600" size={40} />
          <h1 className="text-3xl font-bold text-gray-900">Traveloop</h1>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          {isSignup ? 'Start planning your dream trips' : 'Continue your travel journey'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {!isSignup && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
