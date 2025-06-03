import type { MovieAPIInterface } from "../../models";

/**
 * API configuration
 */
const API_CONFIG = {
  baseUrl:
    "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master",
  endpoints: {
    movies: "/movies.json",
    genres: "/genres.json",
  },
} as const;

/**
 * Fetch full list of movie results from github raw file
 */
export async function fetchMovies(): Promise<MovieAPIInterface[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.movies}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const responseJson = (await response.json()) as MovieAPIInterface[];
    return responseJson;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
}
/**
 * Gets genre list from same github repo
 */
export async function fetchGenres(): Promise<string[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.genres}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const responseJson = (await response.json()) as string[];
    return responseJson;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
}
