import { createSignal } from "solid-js";
import type { ResolvedChildren } from "solid-js/types/reactive/signal";

const movieGenresUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=163eabde6e8129fc03b71f3e1548d458&language=en-US';
const movieGenresResponse = await fetch(movieGenresUrl);
const movieGenresData = await movieGenresResponse.json();

export const [movieGenres] = createSignal(movieGenresData.genres);

type Props = {
    children: ResolvedChildren;
}

export function Genres({children}: Props) {
    return children;
}
