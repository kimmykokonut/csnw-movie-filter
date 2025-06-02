import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Dialog, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { MovieAPIInterface } from "../models";
import { fetchMovies } from "../services/api/movies";
import FilterForm from "./FilterForm";
import Movie from "./Movie";

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [movies, setMovies] = useState<MovieAPIInterface[]>([]);
  const [allMovies, setAllMovies] = useState<MovieAPIInterface[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("1900-2023");

  useEffect(() => {
    const loadAllMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setAllMovies(data);
    };
    loadAllMovies();
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
      console.log("decade", filters);
      console.log("type", typeof filters.decade);
      if (filters.decade === "all") {
        setMovies(allMovies);
        setActiveFilter("1900-2023");
      } else {
        const decadeStart = parseInt(filters.decade);
        console.log("type decstart", typeof decadeStart);
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
        <FilterForm onClose={handleCloseFilter} onSubmit={handleFilterSubmit} />
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
