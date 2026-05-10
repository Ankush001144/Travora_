import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { CreateTrip } from "./pages/CreateTrip";
import { MyTrips } from "./pages/MyTrips";
import { ItineraryBuilder } from "./pages/ItineraryBuilder";
import { ItineraryView } from "./pages/ItineraryView";
import { CitySearch } from "./pages/CitySearch";
import { ActivitySearch } from "./pages/ActivitySearch";
import { Budget } from "./pages/Budget";
import { PackingList } from "./pages/PackingList";
import { TripNotes } from "./pages/TripNotes";
import { Profile } from "./pages/Profile";
import { SharedItinerary } from "./pages/SharedItinerary";
import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { index: true, Component: Login },
    ],
  },
  {
    path: "/app",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "trips", Component: MyTrips },
      { path: "trips/create", Component: CreateTrip },
      { path: "trips/:tripId", Component: ItineraryView },
      { path: "trips/:tripId/edit", Component: ItineraryBuilder },
      { path: "trips/:tripId/budget", Component: Budget },
      { path: "trips/:tripId/packing", Component: PackingList },
      { path: "trips/:tripId/notes", Component: TripNotes },
      { path: "search/cities", Component: CitySearch },
      { path: "search/activities", Component: ActivitySearch },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/shared/:shareId",
    Component: SharedItinerary,
  },
]);
