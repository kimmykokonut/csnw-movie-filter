import { Button, Chip } from "@mui/material";
import { useLocation } from "react-router-dom";
import fallback from "../assets/movie-fallback.jpg";

const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      {/* Title, Image and Description */}
      <h2>
        {movie.title} ({movie.year})
      </h2>
      <img
        height={movie.thumbnail_height || 220}
        width={movie.thumbnail_width || 320}
        src={movie.thumbnail || fallback}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallback;
        }}
      />{" "}
      {movie.extract && <p>{movie.extract}</p>}
      {/* Genres if provided, shown as chips */}
      {movie.genres.length > 0 &&
        movie.genres.map((genre: string, index: number) => (
          <Chip
            label={genre}
            color="secondary"
            variant="outlined"
            key={index}
            sx={{ m: 0.25 }}
          />
        ))}
      {/* Cast if provided */}
      <p>Cast:</p>
      {movie.cast.length === 0 && <p>No cast list provided</p>}
      <ul style={{ listStyleType: "none" }}>
        {movie.cast.length > 0 &&
          movie.cast.map((actor: string, index: number) => (
            <li key={index}>{actor}</li>
          ))}
      </ul>
      {/* Link to wikipedia source */}
      {movie.href && (
        <a
          href={`https://en.wikipedia.org/wiki/${movie.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button color="secondary" variant="outlined">
            Wikipedia Page
          </Button>
        </a>
      )}
    </>
  );
};
export default MovieDetails;
