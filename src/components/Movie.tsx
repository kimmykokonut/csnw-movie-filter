import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import fallback from "../assets/movie-fallback.jpg";
import type { MovieCardInterface } from "../models";

const Movie: React.FC<MovieCardInterface> = ({
  title,
  year,
  thumbnail,
  genres,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        backgroundColor: "paperwhite",
      }}
    >
      {/* <Link to={{ pathname: "/{title? id}" }}> */}
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={thumbnail || fallback}
          alt={title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
        <CardContent>
          <h3>{title}</h3>
          <p>{year}</p>
          {genres.length > 0 &&
            genres.map((genre, index) => (
              <Chip
                label={genre}
                color="secondary"
                variant="outlined"
                key={index}
                sx={{ m: 0.25 }}
              />
            ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Movie;
