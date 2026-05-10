import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Calendar } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { format } from 'date-fns';

export function TripNotes() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTrip, updateTrip } = useTravelContext();

  const trip = getTrip(tripId!);
  const [newNote, setNewNote] = useState('');

  if (!trip) {
    return (
      <div className="p-8">
        <p>Trip not found</p>
      </div>
    );
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date().toISOString(),
    };

    updateTrip(trip.id, {
      notes: [note, ...trip.notes],
    });

    setNewNote('');
  };

  const deleteNote = (noteId: string) => {
    updateTrip(trip.id, {
      notes: trip.notes.filter(note => note.id !== noteId),
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Notes</h1>
          <p className="text-gray-600">{trip.name}</p>
        </div>

        <form onSubmit={handleAddNote} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Note</h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here... (e.g., hotel confirmation numbers, local contacts, reminders)"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-3"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} />
            Add Note
          </button>
        </form>

        <div className="space-y-4">
          {trip.notes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600">No notes yet. Add your first note to keep track of important information.</p>
            </div>
          ) : (
            trip.notes.map(note => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
