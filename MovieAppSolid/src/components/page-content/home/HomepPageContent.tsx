import { createEffect, createResource, createSignal, For } from "solid-js";
import { MovieCard } from "../../movie-card/MovieCard";
import { SearchBox } from "../../search-box/SearchBox";
import { fetchMovieSearch, fetchPopularMovies } from "../../../utils/fetchers";
import type { InputOnInputEvent } from "../../../../types/events";
import type { PopularMovies } from "../../../../types/popular";

const initialData = await fetchPopularMovies();

export function HomePageContent() {
    const [page, setPage] = createSignal(1);
    const [popularMoviesData] = createResource(page, fetchPopularMovies);
    const [pageData, setPageData] = createSignal(initialData);

    const [search, setSearch] = createSignal('');
    const [searchData] = createResource(search, fetchMovieSearch);

    let timeout: number = 0;

    createEffect(() => {
        if ((popularMoviesData()?.page ?? 0) > (pageData()?.page ?? 1)) {
            const data = {
                ...pageData(),
                page: page(),
                results: [
                    ...pageData().results,
                    ...(popularMoviesData() as PopularMovies).results
                ]
            }

            setPageData(data);
        }
    });

    const loadNextPageData = () => setPage(page() + 1);

    const onSearch = (event: InputOnInputEvent<HTMLInputElement>) => {
        clearTimeout(timeout);

        const value = event.currentTarget.value;
        timeout = setTimeout(() => {
            setSearch(value);
        }, 300)
    }

    return (
        <>
			<SearchBox onInput={onSearch} />
            <div class='container'>
                <h1 class='home-title'>Popular Movies</h1>
                <a href='/favourites' class='toFavouritesLink'>Go to Favourites</a>
                <div class='movies-list'>
                    <For each={(search() ? searchData() : pageData())?.results}>
                        {(movie: any) => <MovieCard data={movie} />}
                    </For>
                </div>
                {!search() ? (
                        <div class='wrapper'>
                            <button
                                class='load-more'
                                onClick={loadNextPageData}
                                disabled={popularMoviesData.loading}
                            >
                                More
                            </button>
                        </div>
                    ) : null
                }
            </div>
        </>
    )
}
