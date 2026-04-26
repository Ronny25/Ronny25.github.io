import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { fetchTMDB } from '../utils/api';
import { Movie, TMDBResponse, Genre, GenreResponse } from '../types/tmdb';
import { MovieCard } from '../components/MovieCard';
import { SearchBox } from '../components/SearchBox';

interface HomeLoaderData {
  popular: TMDBResponse<Movie>;
  genres: Genre[];
}

export const Route = createFileRoute('/')({
  loader: async (): Promise<HomeLoaderData> => {
    const [popular, genreRes] = await Promise.all([
      fetchTMDB<TMDBResponse<Movie>>('/movie/popular'),
      fetchTMDB<GenreResponse>('/genre/movie/list'),
    ]);
    return {
      popular,
      genres: genreRes.genres,
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const { popular, genres } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery) {
        setIsSearching(true);
        try {
          const data = await fetchTMDB<TMDBResponse<Movie>>(`/search/movie?query=${encodeURIComponent(searchQuery)}`);
          setSearchResults(data.results);
        } catch (error) {
          console.error('Search failed', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const moviesToDisplay = searchQuery ? searchResults : popular.results;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBox value={searchQuery} onChange={setSearchQuery} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
        </h1>
      </div>

      {isSearching ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {moviesToDisplay.map((movie) => (
            <MovieCard key={movie.id} movie={movie} allGenres={genres} />
          ))}
        </div>
      )}

      {!searchQuery && moviesToDisplay.length === 0 && !isSearching && (
        <p className="text-center text-gray-500 mt-12 text-lg">No movies found.</p>
      )}
    </div>
  );
}
