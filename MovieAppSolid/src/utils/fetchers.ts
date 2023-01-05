import type { MovieDetails } from "../../types/movie";
import type { PopularMovies } from "../../types/popular";
import type { MovieSearchDetails } from "../../types/search";
import { createPopularUrl, createMovieDetailsUrl, createMovieSearchUrl } from "./urls";

const fetcher = async <T extends any>(url: string | URL, init?: RequestInit): Promise<T> => await (await fetch(url, init)).json();

export const fetchPopularMovies = async (page = 1) => fetcher<PopularMovies>(createPopularUrl(page));

export const fetchMovieSearch = async (query: string): Promise<MovieSearchDetails> => query
    ? fetcher<MovieSearchDetails>(createMovieSearchUrl({query, page: 1}))
    : Promise.resolve({} as MovieSearchDetails);

export const fetchMovieDetails = async (id: string | number) => fetcher<MovieDetails>(createMovieDetailsUrl(id));
