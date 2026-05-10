import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function Budget() {
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

  const activitiesCost = trip.stops.reduce(
    (sum, stop) => sum + stop.activities.reduce((a, activity) => a + activity.cost, 0),
    0
  );

  const estimatedTransport = trip.stops.length * 200;
  const estimatedAccommodation = trip.stops.length * 150;
  const estimatedMeals = trip.stops.length * 100;

  const totalEstimated = activitiesCost + estimatedTransport + estimatedAccommodation + estimatedMeals;

  const pieData = [
    { name: 'Activities', value: activitiesCost, color: '#818cf8' },
    { name: 'Transport', value: estimatedTransport, color: '#34d399' },
    { name: 'Accommodation', value: estimatedAccommodation, color: '#fbbf24' },
    { name: 'Meals', value: estimatedMeals, color: '#f87171' },
  ];

  const barData = trip.stops.map((stop, index) => {
    const stopActivitiesCost = stop.activities.reduce((sum, activity) => sum + activity.cost, 0);
    return {
      name: stop.cityName,
      cost: stopActivitiesCost + 200 + 150 + 100,
    };
  });

  const isOverBudget = totalEstimated > trip.totalBudget;
  const remaining = trip.totalBudget - totalEstimated;

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Overview</h1>
        <p className="text-gray-600">{trip.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2 text-gray-600">
            <DollarSign size={20} />
            <span className="text-sm">Total Budget</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${trip.totalBudget.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2 text-gray-600">
            <TrendingUp size={20} />
            <span className="text-sm">Estimated Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalEstimated.toLocaleString()}</p>
        </div>

        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${isOverBudget ? 'border-red-300' : 'border-green-300'}`}>
          <div className="flex items-center gap-2 mb-2 text-gray-600">
            <DollarSign size={20} />
            <span className="text-sm">Remaining</span>
          </div>
          <p className={`text-3xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
            ${Math.abs(remaining).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2 text-gray-600">
            <DollarSign size={20} />
            <span className="text-sm">Avg Per Day</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ${Math.round(totalEstimated / (trip.stops.length || 1))}
          </p>
        </div>
      </div>

      {isOverBudget && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-red-900">Budget Alert</p>
            <p className="text-sm text-red-700 mt-1">
              Your estimated costs exceed your budget by ${Math.abs(remaining).toLocaleString()}. Consider adjusting your itinerary or increasing your budget.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `$${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost by Destination</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Breakdown</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Activities</p>
              <p className="text-sm text-gray-600">Planned activities and tours</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">${activitiesCost}</p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Transportation</p>
              <p className="text-sm text-gray-600">Flights, trains, and local transport</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">${estimatedTransport}</p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Accommodation</p>
              <p className="text-sm text-gray-600">Hotels and stays</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">${estimatedAccommodation}</p>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Meals & Dining</p>
              <p className="text-sm text-gray-600">Food and beverages</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">${estimatedMeals}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
