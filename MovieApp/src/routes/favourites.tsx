import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchTMDB } from '../utils/api';
import { Genre, GenreResponse } from '../types/tmdb';
import { MovieCard } from '../components/MovieCard';
import { useFavourites } from '../hooks/useFavourites';

export const Route = createFileRoute('/favourites')({
  loader: async (): Promise<{ genres: Genre[] }> => {
    const genreRes = await fetchTMDB<GenreResponse>('/genre/movie/list');
    return {
      genres: genreRes.genres,
    };
  },
  component: FavouritesComponent,
});

function FavouritesComponent() {
  const { genres } = Route.useLoaderData();
  const { favourites } = useFavourites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Favourite Movies</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Search for new movie
        </Link>
      </div>

      {favourites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
          <h3 className="text-xl text-gray-500">You didn&apos;t add any movie to your favourites yet</h3>
          <Link to="/" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Go Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favourites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} allGenres={genres} />
          ))}
        </div>
      )}
    </div>
  );
}
