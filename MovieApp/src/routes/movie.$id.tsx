import { createFileRoute } from '@tanstack/react-router';
import { fetchTMDB } from '../utils/api';
import { Movie, TMDBResponse, Genre, GenreResponse } from '../types/tmdb';
import { MovieCard } from '../components/MovieCard';
import { useFavourites } from '../hooks/useFavourites';
import { getTMDBImageUrl, getTMDBImageSrcSet, NO_POSTER_URL } from '../utils/image';

interface MovieLoaderData {
  movie: Movie;
  genres: Genre[];
  recommendations: Movie[];
  similar: Movie[];
}

export const Route = createFileRoute('/movie/$id')({
  loader: async ({ params }): Promise<MovieLoaderData> => {
    const { id } = params;
    const [movie, genreRes, recommendationsRes, similarRes] = await Promise.all([
      fetchTMDB<Movie>(`/movie/${id}`),
      fetchTMDB<GenreResponse>('/genre/movie/list'),
      fetchTMDB<TMDBResponse<Movie>>(`/movie/${id}/recommendations`),
      fetchTMDB<TMDBResponse<Movie>>(`/movie/${id}/similar`),
    ]);

    return {
      movie,
      genres: genreRes.genres,
      recommendations: recommendationsRes.results.slice(0, 4),
      similar: similarRes.results.slice(0, 4),
    };
  },
  component: MovieDetailsComponent,
});

function MovieDetailsComponent() {
  const { movie, genres, recommendations, similar } = Route.useLoaderData();
  const { isFavourite, toggleFavourite } = useFavourites();

  return (
    <div className="container mx-auto px-4 py-8">
      <title>{`${movie.title} - MovieApp`}</title>
      <meta name="description" content={movie.overview} />
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="rounded-lg shadow-xl overflow-hidden bg-gray-200 aspect-[2/3]">
            {movie.poster_path ? (
              <a href={getTMDBImageUrl(movie.poster_path, 'original')} target="_blank" rel="noreferrer">
                <img
                  src={getTMDBImageUrl(movie.poster_path, 'w500')}
                  srcSet={getTMDBImageSrcSet(movie.poster_path, ['w342', 'w500', 'w780'])}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 30vw, 400px"
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              </a>
            ) : (
              <img src={NO_POSTER_URL} alt="no poster found" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && <p className="text-xl italic text-gray-600 mb-4">{movie.tagline}</p>}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleFavourite(movie)}
                className={`text-4xl focus:outline-none transition-transform hover:scale-110 ${
                  isFavourite(movie.id) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xl">
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            {movie.release_date && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Release Date</h3>
                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
            )}
            {movie.budget && movie.budget > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Budget</h3>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
            )}
            {movie.revenue && movie.revenue > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Revenue</h3>
                <p>${movie.revenue.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Overview</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{movie.overview}</p>
          </div>

          {movie.homepage && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Homepage</h3>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {movie.homepage}
              </a>
            </div>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((m) => (
              <MovieCard key={m.id} movie={m} allGenres={genres} />
            ))}
          </div>
        </section>
      )}

      {similar.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Similar Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((m) => (
              <MovieCard key={m.id} movie={m} allGenres={genres} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
