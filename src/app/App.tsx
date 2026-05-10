import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TravelProvider } from './context/TravelContext';

export default function App() {
  return (
    <TravelProvider>
      <RouterProvider router={router} />
    </TravelProvider>
  );
}