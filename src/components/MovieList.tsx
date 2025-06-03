import FilterListIcon from "@mui/icons-material/FilterList";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Pagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FilterValues, MovieAPIInterface } from "../models";
import { fetchGenres, fetchMovies } from "../services/api/movies";
import FilterForm from "./FilterForm";
import Movie from "./Movie";

const MovieList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(24);
  const [movies, setMovies] = useState<MovieAPIInterface[]>([]);
  const [allMovies, setAllMovies] = useState<MovieAPIInterface[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [decadeFilter, setDecadeFilter] = useState<string>("1900-2023");
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const [movieData, genreData] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
        ]);
        setMovies(movieData);
        setAllMovies(movieData);
        setGenres(genreData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  const handleFilter = (filters: FilterValues): void => {
    let filteredMovies = allMovies;
    // reset filter display
    setDecadeFilter("1900-2023");
    setGenreFilter("");
    // filter by decade
    if (filters.decade.length > 0) {
      const decadeStart = parseInt(filters.decade);
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.year >= decadeStart && movie.year < decadeStart + 10;
      });
      setDecadeFilter(`${filters.decade}s`);
    }
    // if user chose genre, filter current movies by selected genres.
    if (filters.genres) {
      const selectedGenres = filters.genres;
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genres.some((movieGenre) => selectedGenres.includes(movieGenre))
      );
      setGenreFilter(selectedGenres.join(", "));
    }
    setMovies(filteredMovies);
    setCurrentPage(1);
    setOpenFilter(false);
  };

  const toggleView = (): void => {
    setCurrentView((view) => (view === "list" ? "grid" : "list"));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box>
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
          maxWidth="sm"
          fullWidth
        >
          <FilterForm
            onClose={() => setOpenFilter(false)}
            onSubmit={handleFilter}
            genres={genres}
          />
        </Dialog>
        <Box>
          <h2>No movies have been found. Try a different filter</h2>
        </Box>
      </Box>
    );
  }

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
        maxWidth="sm"
        fullWidth
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
        aria-label={`Switch to ${
          currentView === "grid" ? "list" : "grid"
        } view`}
      >
        {currentView === "grid" ? <FormatListBulletedIcon /> : <GridViewIcon />}
      </IconButton>
      <hr />
      {/* List of movie results */}
      {/* Grid View  */}
      {currentView === "grid" ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {currentMovies.map((movie) => (
            <Link
              to={`/${encodeURIComponent(movie.title)}`}
              state={{ movie }}
              key={`${movie.title}-${movie.year}`}
            >
              <Movie
                title={movie.title}
                year={movie.year}
                href={movie.href}
                thumbnail={movie.thumbnail}
                genres={movie.genres}
              />
            </Link>
          ))}
        </div>
      ) : (
        // List View
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="table of movie data">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left">Genres</TableCell>
                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentMovies.map((movie) => (
                <TableRow
                  key={`${movie.title}-${movie.year}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/${encodeURIComponent(movie.title)}`}
                      state={{ movie }}
                    >
                      {movie.title}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{movie.genres.join(", ")}</TableCell>
                  <TableCell align="right">{movie.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Pagination of results */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_: React.ChangeEvent<unknown>, value: number) =>
            setCurrentPage(value)
          }
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
