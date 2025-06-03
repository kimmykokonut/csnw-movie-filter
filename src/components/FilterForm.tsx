import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import type { FilterValues } from "../models";

interface FilterFormProps {
  onClose: () => void;
  onSubmit: (filters: FilterValues) => void;
  genres: string[];
}

const FilterForm: React.FC<FilterFormProps> = ({
  onClose,
  onSubmit,
  genres,
}: FilterFormProps) => {
  const [selectedDecade, setSelectedDecade] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: { decade: string; genres?: string[] } = {
      decade: selectedDecade,
    };

    if (selectedGenres.length > 0) {
      filters.genres = selectedGenres;
    }

    onSubmit(filters);
    onClose();
  };

  const handleGenreSelect = (genre: string, checked: boolean): void => {
    setSelectedGenres((prev) =>
      checked ? [...prev, genre] : prev.filter((g) => g !== genre)
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="filter-dialog-title">Filter Movie Results</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 2 }}>
            <InputLabel id="decade" sx={{ mb: 1 }}>
              By Decade:
            </InputLabel>
            <FormControl>
              <Select
                name="decade"
                id="decade"
                autoFocus
                value={selectedDecade}
                defaultValue=""
                displayEmpty
                onChange={(e: SelectChangeEvent<string>) =>
                  setSelectedDecade(e.target.value)
                }
                size="small"
              >
                <MenuItem value="">All(1900-2023)</MenuItem>
                <MenuItem value="1900">1900s</MenuItem>
                <MenuItem value="1910">1910s</MenuItem>
                <MenuItem value="1920">1920s</MenuItem>
                <MenuItem value="1930">1930s</MenuItem>
                <MenuItem value="1940">1940s</MenuItem>
                <MenuItem value="1950">1950s</MenuItem>
                <MenuItem value="1960">1960s</MenuItem>
                <MenuItem value="1970">1970s</MenuItem>
                <MenuItem value="1980">1980s</MenuItem>
                <MenuItem value="1990">1990s</MenuItem>
                <MenuItem value="2000">2000s</MenuItem>
                <MenuItem value="2010">2010s</MenuItem>
                <MenuItem value="2020">2020s</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 1 }}>
            <InputLabel sx={{ mb: 1 }}>By Genre</InputLabel>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {genres.map((genre) => (
                <FormControlLabel
                  key={genre}
                  label={genre}
                  control={
                    <Checkbox
                      id={genre}
                      name={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={(e) =>
                        handleGenreSelect(genre, e.target.checked)
                      }
                      size="small"
                      color="secondary"
                    />
                  }
                />
              ))}
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="secondary">
            Filter
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
export default FilterForm;
