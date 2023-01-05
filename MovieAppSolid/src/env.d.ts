/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_MOVIE_DB_API_URL: string;
    readonly PUBLIC_MOVIE_DB_API_KEY: string;
    readonly PUBLIC_MOVIE_DB_IMAGE_URL: string;
    readonly PUBLIC_NO_POSTER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
