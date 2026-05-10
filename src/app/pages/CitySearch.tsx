import { useState } from 'react';
import { Search, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';

export function CitySearch() {
  const { cities } = useTravelContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', ...new Set(cities.map(c => c.region))];

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Cities</h1>
        <p className="text-gray-600">
          Discover amazing destinations for your next trip
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cities or countries..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRegion === region
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {filteredCities.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No cities found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map(city => (
            <div
              key={city.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <TrendingUp size={12} className="text-green-600" />
                  {city.popularity}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{city.name}</h3>
                <p className="text-gray-600 mb-3">{city.country} • {city.region}</p>
                <p className="text-sm text-gray-600 mb-4">{city.description}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-gray-500" />
                    <span className="text-gray-700">Cost: {city.costIndex}/10</span>
                  </div>
                </div>

                <button className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
