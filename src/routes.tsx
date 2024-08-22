import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';
import Search from './pages/Search';
import WeatherTimeline from './pages/Home/components/weather/WeatherTimeline';
import WeatherCard from './pages/Home/components/weather/WeatherCard';
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', index: true, element: <Home /> },
      {
        path: '/search',
        element: <Search />,
      },
      { path : '/weathertimeline', element: <WeatherTimeline />},
      { path : '/weathercard', element: <WeatherCard />},
    ],
  },
]) as ReturnType<typeof createBrowserRouter>;
