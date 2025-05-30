import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import type { MovieAPIInterface } from "../models";
import { fetchMovies } from "../services/api/movies";
import Movie from "./Movie";

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [movies, setMovies] = useState<MovieAPIInterface[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    loadMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <>
      <h2>Movies from 1900 to 2023</h2>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <hr />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {currentMovies.map((movie, index) => (
          <Movie
            key={index}
            title={movie.title}
            year={movie.year}
            href={movie.href}
            thumbnail={movie.thumbnail}
            genres={movie.genres}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="secondary"
          sx={{
            "& .MuiPaginationItem-root, & .Mui-selected": {
              color: "#fff",
            },
          }}
        />
      </div>
    </>
  );
};
export default MovieList;
