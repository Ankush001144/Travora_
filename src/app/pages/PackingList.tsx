import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';

export function PackingList() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTrip, updateTrip } = useTravelContext();

  const trip = getTrip(tripId!);
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  if (!trip) {
    return (
      <div className="p-8">
        <p>Trip not found</p>
      </div>
    );
  }

  const categories = [...new Set(trip.packingList.map(item => item.category))];
  if (!categories.includes('General')) categories.push('General');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item = {
      id: Date.now().toString(),
      name: newItem,
      category: newCategory,
      isPacked: false,
    };

    updateTrip(trip.id, {
      packingList: [...trip.packingList, item],
    });

    setNewItem('');
  };

  const togglePacked = (itemId: string) => {
    updateTrip(trip.id, {
      packingList: trip.packingList.map(item =>
        item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
      ),
    });
  };

  const deleteItem = (itemId: string) => {
    updateTrip(trip.id, {
      packingList: trip.packingList.filter(item => item.id !== itemId),
    });
  };

  const packedCount = trip.packingList.filter(item => item.isPacked).length;
  const totalCount = trip.packingList.length;
  const progress = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Packing Checklist</h1>
          <p className="text-gray-600">{trip.name}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              {packedCount} of {totalCount} items packed
            </span>
            <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleAddItem} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Item</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Item name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Toiletries">Toiletries</option>
              <option value="Documents">Documents</option>
              <option value="General">General</option>
            </select>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {categories.map(category => {
            const categoryItems = trip.packingList.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                <div className="space-y-2">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        item.isPacked ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={() => togglePacked(item.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          item.isPacked
                            ? 'bg-green-600 border-green-600'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {item.isPacked && <Check className="text-white" size={16} />}
                      </button>
                      <span
                        className={`flex-1 ${
                          item.isPacked ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}
                      >
                        {item.name}
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="flex-shrink-0 p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {trip.packingList.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No items in your packing list yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
