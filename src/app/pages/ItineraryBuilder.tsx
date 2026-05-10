import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Plus, ArrowLeft, Trash2, Calendar, DollarSign, Clock, X } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';

export function ItineraryBuilder() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTrip, updateTrip, cities, activities: availableActivities } = useTravelContext();

  const trip = getTrip(tripId!);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  if (!trip) {
    return (
      <div className="p-8">
        <p>Trip not found</p>
      </div>
    );
  }

  const addStop = (city: typeof cities[0]) => {
    const newStop = {
      id: Date.now().toString(),
      cityId: city.id,
      cityName: city.name,
      country: city.country,
      startDate: trip.startDate,
      endDate: trip.endDate,
      activities: [],
      imageUrl: city.imageUrl,
    };

    updateTrip(trip.id, {
      stops: [...trip.stops, newStop],
    });
    setShowCityModal(false);
  };

  const removeStop = (stopId: string) => {
    updateTrip(trip.id, {
      stops: trip.stops.filter(s => s.id !== stopId),
    });
  };

  const addActivityToStop = (stopId: string, activity: typeof availableActivities[0]) => {
    const stops = trip.stops.map(stop => {
      if (stop.id === stopId) {
        return {
          ...stop,
          activities: [...stop.activities, { ...activity }],
        };
      }
      return stop;
    });

    updateTrip(trip.id, { stops });
    setShowActivityModal(false);
    setSelectedStopId(null);
  };

  const removeActivity = (stopId: string, activityId: string) => {
    const stops = trip.stops.map(stop => {
      if (stop.id === stopId) {
        return {
          ...stop,
          activities: stop.activities.filter(a => a.id !== activityId),
        };
      }
      return stop;
    });

    updateTrip(trip.id, { stops });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/app/trips')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back to Trips
        </button>
        <Link
          to={`/app/trips/${trip.id}`}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Preview Itinerary
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.name}</h1>
        <p className="text-gray-600">Build your itinerary by adding destinations and activities</p>
      </div>

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
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => removeStop(stop.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                Stop {index + 1}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{stop.cityName}</h3>
                  <p className="text-gray-600">{stop.country}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedStopId(stop.id);
                    setShowActivityModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus size={16} />
                  Add Activity
                </button>
              </div>

              {stop.activities.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Activities</h4>
                  {stop.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{activity.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            ${activity.cost}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {activity.duration}h
                          </span>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeActivity(stop.id, activity.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No activities added yet</p>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowCityModal(true)}
          className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all"
        >
          <Plus className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600">Add Destination</p>
        </button>
      </div>

      {showCityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Select a City</h3>
              <button onClick={() => setShowCityModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-4">
                {cities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => addStop(city)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                  >
                    <img src={city.imageUrl} alt={city.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h4 className="font-semibold text-gray-900">{city.name}</h4>
                    <p className="text-sm text-gray-600">{city.country}</p>
                    <p className="text-xs text-gray-500 mt-2">Cost Index: {city.costIndex}/10</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showActivityModal && selectedStopId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Add Activity</h3>
              <button
                onClick={() => {
                  setShowActivityModal(false);
                  setSelectedStopId(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {availableActivities.map(activity => (
                  <button
                    key={activity.id}
                    onClick={() => addActivityToStop(selectedStopId, activity)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all"
                  >
                    <h4 className="font-semibold text-gray-900">{activity.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        ${activity.cost}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {activity.duration}h
                      </span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                        {activity.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
