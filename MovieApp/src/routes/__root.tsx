import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { FavouritesProvider } from '../context/FavouritesContext';

export const Route = createRootRoute({
  component: () => (
    <FavouritesProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter uppercase">
              MovieApp
            </Link>
            <div className="flex gap-6 items-center font-medium">
              <Link 
                to="/" 
                className="hover:text-blue-600 transition-colors [&.active]:text-blue-600 [&.active]:font-bold"
              >
                Home
              </Link>
              <Link 
                to="/favourites" 
                className="hover:text-blue-600 transition-colors [&.active]:text-blue-600 [&.active]:font-bold"
              >
                Favourites
              </Link>
            </div>
          </nav>
        </header>
        
        <main className="flex-grow">
          <Outlet />
        </main>

        <footer className="bg-white border-t py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MovieApp Modernization. Data from TMDB.</p>
          </div>
        </footer>

        <TanStackRouterDevtools />
      </div>
    </FavouritesProvider>
  ),
});
