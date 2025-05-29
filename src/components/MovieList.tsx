import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "@mui/material";
import Movie from "./Movie";

const MovieList = () => {
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
