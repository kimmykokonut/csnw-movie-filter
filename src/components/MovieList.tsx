import FilterListIcon from "@mui/icons-material/FilterList";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { Button, Dialog, IconButton, Pagination } from "@mui/material";
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
  const [decadeFilter, setDecadeFilter] = useState<string>("1900-2023");
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");

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

  const handleFilter = (filters: { decade: string; genres?: string[] }) => {
    setMovies(allMovies);
    setDecadeFilter("1900-2023");
    setGenreFilter("");

    // filter by decade
    if (filters.decade.length > 0) {
      const decadeStart = parseInt(filters.decade);
      const filteredByDecade = allMovies.filter((movie) => {
        return movie.year >= decadeStart && movie.year < decadeStart + 10;
      });
      setMovies(filteredByDecade);
      setDecadeFilter(`${filters.decade}s`);
    }

    // if user chose genre, filter current movies by selected genres.
    if (filters.genres) {
      const selectedGenres = filters.genres;
      const filteredByGenre = movies.filter((movie) =>
        movie.genres.some((movieGenre) => selectedGenres.includes(movieGenre))
      );
      setMovies(filteredByGenre);
      setGenreFilter(selectedGenres.join(", "));
    }

    setCurrentPage(1);
    setOpenFilter(false);
  };

  const toggleView = () => {
    setCurrentView((view) => (view === "list" ? "grid" : "list"));
  };

  return (
    <>
      <h2>Movies: {decadeFilter}</h2>
      <p>{genreFilter}</p>
      <p>{movies.length} records</p>
      {/* Filter Button and Form Component  */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FilterListIcon />}
        onClick={() => setOpenFilter(true)}
      >
        Filter
      </Button>
      <Dialog
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        aria-labelledby="filter-dialog-title"
        disableRestoreFocus
      >
        <FilterForm
          onClose={() => setOpenFilter(false)}
          onSubmit={handleFilter}
          genres={genres}
        />
      </Dialog>
      <IconButton
        color="secondary"
        onClick={toggleView}
        aria-label="`Switch to ${currentView === 'grid' ? 'list' : 'grid'} view`}"
      >
        {currentView === "grid" ? <FormatListBulletedIcon /> : <GridViewIcon />}
      </IconButton>

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
      {/* Pagination of results */}
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
