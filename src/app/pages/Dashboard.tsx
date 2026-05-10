import { Link } from 'react-router';
import { Plus, Calendar, MapPin, DollarSign, TrendingUp } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { format } from 'date-fns';

export function Dashboard() {
  const { trips, cities, user } = useTravelContext();

  const upcomingTrips = trips.filter(
    trip => new Date(trip.startDate) > new Date()
  ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const popularCities = cities.sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  const totalBudget = trips.reduce((sum, trip) => sum + trip.totalBudget, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Ready to plan your next adventure?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Calendar className="text-indigo-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{trips.length}</p>
          <p className="text-gray-600">Total Trips</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPin className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {trips.reduce((sum, trip) => sum + trip.stops.length, 0)}
          </p>
          <p className="text-gray-600">Destinations</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
          <p className="text-gray-600">Total Budget</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
            <Link
              to="/app/trips/create"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={20} />
              Plan New Trip
            </Link>
          </div>

          {upcomingTrips.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
              <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-4">No upcoming trips yet</p>
              <Link
                to="/app/trips/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={20} />
                Create Your First Trip
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <Link
                  key={trip.id}
                  to={`/app/trips/${trip.id}`}
                  className="block bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {trip.coverPhoto && (
                      <img
                        src={trip.coverPhoto}
                        alt={trip.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{trip.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{trip.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {trip.stops.length} stops
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Popular Destinations</h2>
            <Link
              to="/app/search/cities"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {popularCities.map((city) => (
              <Link
                key={city.id}
                to={`/app/search/cities?city=${city.id}`}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold">{city.name}</h3>
                    <p className="text-sm opacity-90">{city.country}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <TrendingUp size={12} className="text-green-600" />
                  {city.popularity}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
