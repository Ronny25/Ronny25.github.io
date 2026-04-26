import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Movie } from '../types/tmdb';

interface FavouritesContextType {
  favourites: Movie[];
  isFavourite: (movieId: number) => boolean;
  toggleFavourite: (movie: Movie) => void;
  removeFavourite: (movieId: number) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useLocalStorage<Movie[]>('favourite', []);

  const isFavourite = (movieId: number) => {
    return favourites.some((m) => m.id === movieId);
  };

  const toggleFavourite = (movie: Movie) => {
    if (isFavourite(movie.id)) {
      setFavourites(favourites.filter((m) => m.id !== movie.id));
    } else {
      setFavourites([...favourites, movie]);
    }
  };

  const removeFavourite = (movieId: number) => {
    setFavourites(favourites.filter((m) => m.id !== movieId));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggleFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavouritesContext() {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavouritesContext must be used within a FavouritesProvider');
  }
  return context;
}
