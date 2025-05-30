/**
 * Interface for movie objects returned from Api call
 */
export interface MovieAPIInterface {
  title: string;
  year: number;
  href: string;
  thumbnail: string;
  cast: string[];
  genres: string[];
  extract: string;
  thumbnail_width: number;
  thumbnail_height: number;
}

export type MovieCardInterface = Pick<
  MovieAPIInterface,
  "title" | "year" | "href" | "thumbnail" | "genres"
>;
