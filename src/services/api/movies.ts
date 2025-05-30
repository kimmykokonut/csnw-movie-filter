import type { MovieAPIInterface } from "../../models";

// change to env later
const BASE_URL = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/refs/heads/master/movies.json"

export async function fetchMovies(): Promise<MovieAPIInterface[]> {
  console.log('fetching data')
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
      const responseData = await response.json() as MovieAPIInterface[];
    return responseData;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
}