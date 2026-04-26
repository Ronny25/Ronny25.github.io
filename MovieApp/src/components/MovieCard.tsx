import { Link } from '@tanstack/react-router';
import { Movie, Genre } from '../types/tmdb';
import { useFavourites } from '../hooks/useFavourites';
import { getTMDBImageUrl, getTMDBImageSrcSet } from '../utils/image';

interface MovieCardProps {
  movie: Movie;
  allGenres: Genre[];
}

export function MovieCard({ movie, allGenres }: MovieCardProps) {
  const { isFavourite, toggleFavourite } = useFavourites();

  const movieGenres = movie.genre_ids
    ? movie.genre_ids
        .map((id) => allGenres.find((g) => g.id === id)?.name)
        .filter(Boolean)
        .join(', ')
    : movie.genres?.map((g) => g.name).join(', ') || '';

  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="relative aspect-[2/3] bg-gray-200">
        <Link to="/movie/$id" params={{ id: movie.id.toString() }}>
          <img
            src={getTMDBImageUrl(movie.poster_path, 'w342')}
            srcSet={getTMDBImageSrcSet(movie.poster_path, ['w185', 'w342', 'w500'])}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            loading="lazy"
            decoding="async"
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{movie.title}</h3>
        <p className="text-xs text-gray-500 mb-2">{movieGenres}</p>
        
        {movie.vote_average > 0 && (
          <div className="flex items-center mb-2">
            <button
              onClick={() => toggleFavourite(movie)}
              className={`text-2xl mr-2 focus:outline-none transition-colors ${
                isFavourite(movie.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
              }`}
            >
              ★
            </button>
            <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
          </div>
        )}

        <p className="text-sm text-gray-700 line-clamp-3 mb-4 flex-grow">
          {movie.overview}
        </p>

        <Link
          to="/movie/$id"
          params={{ id: movie.id.toString() }}
          className="text-blue-600 hover:underline text-sm font-medium mt-auto"
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
