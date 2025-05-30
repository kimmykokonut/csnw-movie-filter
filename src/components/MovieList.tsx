import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import type { MovieAPIInterface } from "../models";
import { fetchMovies } from "../services/api/movies";
import Movie from "./Movie";

const MovieList = () => {
  const [movies, setMovies] = useState<MovieAPIInterface[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchMovies();
      setMovies(data);
    }
    loadMovies();
  }, []);
  console.log(movies[0]);

  return (
    <>
      <h1>Movie List</h1>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <p>(Filter by genre, decade)</p>
      {/* iterate through movie cards */}
      <Movie />
      <Movie />
    </>
  );
};
export default MovieList;
