import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Edit, Wallet, Package, FileText, Share2 } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { format, differenceInDays } from 'date-fns';

export function ItineraryView() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTrip } = useTravelContext();

  const trip = getTrip(tripId!);

  if (!trip) {
    return (
      <div className="p-8">
        <p>Trip not found</p>
      </div>
    );
  }

  const totalDays = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  const totalActivitiesCost = trip.stops.reduce(
    (sum, stop) => sum + stop.activities.reduce((a, activity) => a + activity.cost, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: trip.coverPhoto
            ? `url(${trip.coverPhoto})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-end p-8">
          <div className="text-white">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-4 hover:opacity-80"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <h1 className="text-4xl font-bold mb-2">{trip.name}</h1>
            <p className="text-lg opacity-90">{trip.description}</p>
            <div className="flex items-center gap-6 mt-4">
              <span className="flex items-center gap-2">
                <Calendar size={20} />
                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={20} />
                {trip.stops.length} destinations
              </span>
              <span className="flex items-center gap-2">
                <Clock size={20} />
                {totalDays} days
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to={`/app/trips/${trip.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Edit size={16} />
              Edit Itinerary
            </Link>
            <Link
              to={`/app/trips/${trip.id}/budget`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Wallet size={16} />
              Budget
            </Link>
            <Link
              to={`/app/trips/${trip.id}/packing`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Package size={16} />
              Packing List
            </Link>
            <Link
              to={`/app/trips/${trip.id}/notes`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <FileText size={16} />
              Notes
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Share2 size={16} />
              Share
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Trip Overview</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">${trip.totalBudget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Activities Cost</p>
                <p className="text-2xl font-bold text-gray-900">${totalActivitiesCost}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trip.stops.reduce((sum, stop) => sum + stop.activities.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>

            {trip.stops.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-4">No destinations added yet</p>
                <Link
                  to={`/app/trips/${trip.id}/edit`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Edit size={20} />
                  Start Building Itinerary
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {trip.stops.map((stop, index) => (
                  <div key={stop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative">
                      {stop.imageUrl && (
                        <img
                          src={stop.imageUrl}
                          alt={stop.cityName}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                        Day {index + 1}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900">{stop.cityName}</h3>
                        <p className="text-gray-600">{stop.country}</p>
                      </div>

                      {stop.activities.length > 0 ? (
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Activities</h4>
                          {stop.activities.map((activity) => (
                            <div key={activity.id} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{activity.name}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                </div>
                                <span className="ml-4 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                                  {activity.category}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
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
                      ) : (
                        <p className="text-gray-500 italic">No activities planned for this destination</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
