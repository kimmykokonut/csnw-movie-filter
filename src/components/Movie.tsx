import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
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
        />
        <CardContent>
          <h3>{title}</h3>
          <p>{year}</p>
          {genres.length > 0 && (
            <ul>
              {genres.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Movie;
