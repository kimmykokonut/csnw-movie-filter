import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Dialog, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { MovieAPIInterface } from "../models";
import { fetchGenres, fetchMovies } from "../services/api/movies";
import FilterForm from "./FilterForm";
import Movie from "./Movie";

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);
  const [movies, setMovies] = useState<MovieAPIInterface[]>([]);
  const [allMovies, setAllMovies] = useState<MovieAPIInterface[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("1900-2023");
  const [genres, setGenres] = useState<[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [movieData, genreData] = await Promise.all([
        fetchMovies(),
        fetchGenres(),
      ]);
      setMovies(movieData);
      setAllMovies(movieData);
      setGenres(genreData);
    };
    loadData();
  }, []);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleFilterSubmit = (filters: { decade?: string }) => {
    if (filters.decade) {
      if (filters.decade === "all") {
        setMovies(allMovies);
        setActiveFilter("1900-2023");
      } else {
        const decadeStart = parseInt(filters.decade);
        const filteredMovies = allMovies.filter((movie) => {
          return movie.year >= decadeStart && movie.year < decadeStart + 10;
        });
        setMovies(filteredMovies);
        setActiveFilter(filters.decade);
      }
    }
    setCurrentPage(1);
    // if genre, do api call next.
    handleCloseFilter();
  };

  return (
    <>
      <h2>Movies: {activeFilter}</h2>
      <p>{movies.length} records</p>
      {/* Filter Button and Form Component  */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FilterListIcon />}
        onClick={handleOpenFilter}
      >
        Filter
      </Button>
      <Dialog open={openFilter} onClose={handleCloseFilter}>
        <FilterForm
          onClose={handleCloseFilter}
          onSubmit={handleFilterSubmit}
          genres={genres}
        />
      </Dialog>
      <hr />
      {/* List of movie results */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {currentMovies.map((movie, index) => (
          <Link
            to={`/${encodeURIComponent(movie.title)}`}
            state={{ movie }}
            key={movie.title}
          >
            <Movie
              key={index}
              title={movie.title}
              year={movie.year}
              href={movie.href}
              thumbnail={movie.thumbnail}
              genres={movie.genres}
            />
          </Link>
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
