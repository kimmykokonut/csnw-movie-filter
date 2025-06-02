import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface FilterFormProps {
  onClose: () => void;
  onSubmit: (filters: { decade?: string; genres?: string[] }) => void;
}

const FilterForm = ({ onClose, onSubmit }: FilterFormProps) => {
  const handleFilter = (formData: FormData) => {
    const filters: { decade?: string; genres?: string[] } = {};
    // only add if selected
    const decade = formData.get("decade") as string;
    if (decade) {
      filters.decade = decade;
    }
    // add genre later
    alert(`you chose ${decade}`);
    onSubmit(filters);
    onClose();
  };

  return (
    <>
      <form action={handleFilter}>
        <DialogTitle>Filter Movie Results</DialogTitle>
        <DialogContent>
          <div>
            <label htmlFor="decade">By Decade:</label>
            <select name="decade" id="decade">
              <option value="">All Decades</option>
              <option value="1900">1900s</option>
              <option value="1910">1910s</option>
              <option value="1920">1920s</option>
              <option value="1930">1930s</option>
              <option value="1940">1940s</option>
              <option value="1950">1950s</option>
              <option value="1960">1960s</option>
              <option value="1970">1970s</option>
              <option value="1980">1980s</option>
              <option value="1990">1990s</option>
              <option value="2000">2000s</option>
              <option value="2010">2010s</option>
              <option value="2020">2020s</option>
            </select>
          </div>
          <div>
            <p>genre here</p>
          </div>
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

//mui example
// <DialogTitle>Subscribe</DialogTitle>
// <DialogContent>
//   <DialogContentText>
//     To subscribe to this website, please enter your email address here. We
//     will send updates occasionally.
//   </DialogContentText>
//   <TextField
//     autoFocus
//     required
//     margin="dense"
//     id="name"
//     name="email"
//     label="Email Address"
//     type="email"
//     fullWidth
//     variant="standard"
//   />
// </DialogContent>
// <DialogActions>
//   <Button onClick={handleClose}>Cancel</Button>
//   <Button type="submit">Subscribe</Button>
// </DialogActions>
