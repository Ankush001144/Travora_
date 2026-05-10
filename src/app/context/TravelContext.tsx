import { createContext, useContext, useState, ReactNode } from 'react';

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  duration: number;
  imageUrl?: string;
}

export interface Stop {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
  imageUrl?: string;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverPhoto?: string;
  stops: Stop[];
  totalBudget: number;
  packingList: PackingItem[];
  notes: Note[];
  isPublic: boolean;
  shareId?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  isPacked: boolean;
}

export interface Note {
  id: string;
  content: string;
  stopId?: string;
  createdAt: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  costIndex: number;
  popularity: number;
  description: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface TravelContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  getTrip: (id: string) => Trip | undefined;
  cities: City[];
  activities: Activity[];
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

const mockCities: City[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    costIndex: 8,
    popularity: 95,
    description: 'The City of Light, known for art, culture, and romance',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    costIndex: 7,
    popularity: 92,
    description: 'A vibrant metropolis blending tradition and modernity',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  },
  {
    id: '3',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    costIndex: 6,
    popularity: 88,
    description: 'Mediterranean charm with stunning architecture',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
  },
  {
    id: '4',
    name: 'New York',
    country: 'USA',
    region: 'North America',
    costIndex: 9,
    popularity: 94,
    description: 'The city that never sleeps',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
  },
  {
    id: '5',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    costIndex: 4,
    popularity: 86,
    description: 'Tropical paradise with beaches and temples',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  },
  {
    id: '6',
    name: 'London',
    country: 'UK',
    region: 'Europe',
    costIndex: 8,
    popularity: 93,
    description: 'Historic capital with modern flair',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    name: 'Eiffel Tower Visit',
    description: 'Iconic landmark with stunning city views',
    category: 'Sightseeing',
    cost: 30,
    duration: 2,
  },
  {
    id: '2',
    name: 'Louvre Museum',
    description: 'World-renowned art museum',
    category: 'Culture',
    cost: 20,
    duration: 3,
  },
  {
    id: '3',
    name: 'Seine River Cruise',
    description: 'Romantic boat tour through Paris',
    category: 'Tours',
    cost: 45,
    duration: 1.5,
  },
  {
    id: '4',
    name: 'Sushi Making Class',
    description: 'Learn traditional sushi preparation',
    category: 'Food',
    cost: 80,
    duration: 3,
  },
  {
    id: '5',
    name: 'Temple Hopping',
    description: 'Visit ancient Buddhist temples',
    category: 'Culture',
    cost: 15,
    duration: 4,
  },
  {
    id: '6',
    name: 'Beach Day',
    description: 'Relax on pristine beaches',
    category: 'Leisure',
    cost: 0,
    duration: 4,
  },
];

export function TravelProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Travel Enthusiast',
    email: 'traveler@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  });

  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      name: 'European Adventure',
      description: 'A month-long journey through Europe',
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      coverPhoto: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      stops: [
        {
          id: '1',
          cityId: '1',
          cityName: 'Paris',
          country: 'France',
          startDate: '2026-06-01',
          endDate: '2026-06-07',
          activities: [
            {
              id: '1',
              name: 'Eiffel Tower Visit',
              description: 'Iconic landmark with stunning city views',
              category: 'Sightseeing',
              cost: 30,
              duration: 2,
            },
            {
              id: '2',
              name: 'Louvre Museum',
              description: 'World-renowned art museum',
              category: 'Culture',
              cost: 20,
              duration: 3,
            },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        },
        {
          id: '2',
          cityId: '3',
          cityName: 'Barcelona',
          country: 'Spain',
          startDate: '2026-06-08',
          endDate: '2026-06-14',
          activities: [],
          imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
        },
      ],
      totalBudget: 5000,
      packingList: [
        { id: '1', name: 'Passport', category: 'Documents', isPacked: true },
        { id: '2', name: 'Camera', category: 'Electronics', isPacked: false },
        { id: '3', name: 'Sunscreen', category: 'Toiletries', isPacked: false },
      ],
      notes: [
        {
          id: '1',
          content: 'Remember to book hotel in advance',
          createdAt: '2026-05-01T10:00:00Z',
        },
      ],
      isPublic: false,
    },
  ]);

  const addTrip = (trip: Trip) => {
    setTrips([...trips, trip]);
  };

  const updateTrip = (id: string, updatedTrip: Partial<Trip>) => {
    setTrips(trips.map(trip => trip.id === id ? { ...trip, ...updatedTrip } : trip));
  };

  const deleteTrip = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const getTrip = (id: string) => {
    return trips.find(trip => trip.id === id);
  };

  return (
    <TravelContext.Provider
      value={{
        user,
        setUser,
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        getTrip,
        cities: mockCities,
        activities: mockActivities,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravelContext() {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
}
