import { For } from "solid-js";
import { MovieCard } from "../../movie-card/MovieCard";

type Props = {
    data: any;
}

export function MoviePageContent({data}: Props) {
    const recommendations: any[] = [];
    const similar: any[] = [];

    const imageBaseUrl = 'https://image.tmdb.org/t/p';

    const state: any = {};
    function onStarClick() {}

    return (
        <div class='movie-page' >
            <a href='/' class='backToMainLink'>Search for new movie</a>
            <a href='/favourites' class='toFavouritesLink'>Go to Favourites</a>
                <div class='movie-content'>
                    <div class='movie-content__poster'>
                        {data.poster_path ? (
                            <a href={`${imageBaseUrl}/original${data.poster_path}`} target='_blanc'>
                                <img src={`${imageBaseUrl}/w500${data.poster_path}`} alt={`${data.title} poster`}/>
                            </a>
                        ) :
                            <img src={import.meta.env.PUBLIC_NO_POSTER_URL} alt='no poster found'/>
                        }
                    </div>
                    <h1 class='movie-content__title'>{data.title}</h1>
                    <h2 class='movie-content__tagline'>{data.tagline}</h2>
                    <div class='movie-content__ratings'>
                            <span
                                class={
                                    state[data.id] ?
                                        'movie-content__star added' :
                                        'movie-content__star'
                                }
                                onClick={onStarClick}
                            >☆</span>
                        <span class='movie-content__grade'>{data.vote_average}</span>
                    </div>
                    <h6 class='movie-content__genres'><span>Genres: </span>
                        <For each={data.genres}>{(genre: any) => <p>{genre.name}</p>}</For>
                    </h6>
                    <h6 class='movie-content__budget'>Budget: ${data.budget}</h6>
                    <h6 class='movie-content__revenue'>Revenue: ${data.revenue}</h6>
                    <p class='movie-content__description'>{data.overview}</p>
                    <p class='movie-content__homeLink'>Homepage:
                        <a href={data.homepage} target='_blanc'>{data.homepage}</a>
                    </p>
                    {recommendations.length > 0 &&
                        <div>
                            <h2 class='movie-header'>Recommendations</h2>
                            <div class='movies-list'>
                                <For each={recommendations}>
                                    {(movie, index) => {
                                        if (index() >= 4) {
                                            return true;
                                        }

                                        return <MovieCard data={movie} />;
                                    }}
                                </For>
                            </div>
                        </div>
                    }
                    {similar.length > 0 &&
                        <div>
                            <h2 class='movie-header'>Similar</h2>
                            <div class='movies-list'>
                                <For each={similar}>
                                    {(movie, index) => {
                                        if (index() >= 4) {
                                            return true;
                                        }

                                        return <MovieCard data={movie} />;
                                    }}
                                </For>
                            </div>
                        </div>
                    }
                </div>
			</div>
    );
}
