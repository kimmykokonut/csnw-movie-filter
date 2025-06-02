import type { MovieAPIInterface } from "../../models";

// change to env later
const BASE_URL =
  "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";
const GENRE_URL =
  "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/genres.json";

/**
 * API call to fetch full list of movie results from github raw file
 */
export async function fetchMovies(): Promise<MovieAPIInterface[]> {
  try {
    const response = await fetch(BASE_URL);
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
    const response = await fetch(GENRE_URL);
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
