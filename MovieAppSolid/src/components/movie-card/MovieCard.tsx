import { replaceAllNonWords } from "../../utils/strings";
import { movieGenres } from "../genres/Genres";
import './MovieCard.scss';

type Props = {
    data: Record<string, any>,
	favourites?: boolean,
	index?: number
}

export function MovieCard({data, favourites, index}: Props) {
    const state: any = {};

    const imageBaseUrl = 'https://image.tmdb.org/t/p';

    function checkGenres(genre: any) {
		const allGenres = movieGenres();
        return null;
    }

    return (
        <div class='movie-card'>
				<div class='movie-poster'>
					{data.poster_path ? (
						<a href={`/movie/${data.id}-${replaceAllNonWords(data.title)}`} >
							<img src={`${imageBaseUrl}/w185${data.poster_path}`} alt={`${data.title} poster`} />
						</a>
					) :
						<img src={import.meta.env.PUBLIC_NO_POSTER_URL} alt='no poster found' />
					}
				</div>
				<div class='movie-info'>
					<h3 class='movie-info__title'>{data.title}</h3>
					<h6 class='movie-info__genres'>{checkGenres(data.genre_ids ? data.genre_ids : data.genres)}</h6>
					{!!data.vote_average &&
						<div class='movie-info__ratings'>
							<span
								class={
									state[data.id] !== null && state[data.id] ||
									favourites ?
									'movie-info__star added' :
									'movie-info__star'
								}
								// onClick={favourites ? favFunc.bind(this, index) : onStarClick}
							>☆</span>
							<span class='movie-info__grade'>{data.vote_average}</span>
						</div>
					}
					<p class='movie-info__description'>{data.overview}</p>
					<a href={`/movie/${data.id}-${replaceAllNonWords(data.title)}`} class='movie-details'>Show more</a>
				</div>
			</div>
    )
}
