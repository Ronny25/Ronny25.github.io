const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const NO_POSTER_URL = 'https://via.placeholder.com/500x750?text=No+Poster';

export type ImageSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

/**
 * Generates a TMDB image URL for a given path and size.
 */
export function getTMDBImageUrl(path: string | null | undefined, size: ImageSize = 'w500'): string {
  if (!path) return NO_POSTER_URL;
  return `${IMAGE_BASE_URL}${size}${path}`;
}

/**
 * Generates a srcSet string for responsive images.
 */
export function getTMDBImageSrcSet(path: string | null | undefined, sizes: ImageSize[]): string {
  if (!path) return '';
  return sizes
    .map((size) => {
      const width = size === 'original' ? '' : size.replace('w', '');
      return `${getTMDBImageUrl(path, size)} ${width}w`;
    })
    .join(', ');
}
