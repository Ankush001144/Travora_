import { useParams } from 'react-router';
import { Calendar, MapPin, Clock, DollarSign, Share2, Copy } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { format } from 'date-fns';

export function SharedItinerary() {
  const { shareId } = useParams();
  const { trips } = useTravelContext();

  const trip = trips[0];

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h1>
          <p className="text-gray-600">This shared itinerary is no longer available.</p>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: trip.coverPhoto
            ? `url(${trip.coverPhoto})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">{trip.name}</h1>
            <p className="text-xl opacity-90 mb-6">{trip.description}</p>
            <div className="flex items-center justify-center gap-6">
              <span className="flex items-center gap-2">
                <Calendar size={20} />
                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={20} />
                {trip.stops.length} destinations
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Share This Trip</h2>
              <p className="text-sm text-gray-600">Anyone with this link can view this itinerary</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Copy size={16} />
              Copy Link
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>

          {trip.stops.map((stop, index) => (
            <div key={stop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                {stop.imageUrl && (
                  <img
                    src={stop.imageUrl}
                    alt={stop.cityName}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full font-medium">
                  Stop {index + 1}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{stop.cityName}</h3>
                  <p className="text-gray-600">{stop.country}</p>
                </div>

                {stop.activities.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 text-lg">Planned Activities</h4>
                    {stop.activities.map((activity) => (
                      <div key={activity.id} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{activity.name}</h5>
                          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-600">
                            {activity.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            ${activity.cost}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {activity.duration} hours
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <Share2 className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-2">Create Your Own Adventure</h3>
          <p className="mb-6 opacity-90">Start planning your dream trip with Traveloop</p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
