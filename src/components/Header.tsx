import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Header = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit" }}>
            Film Finder
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </Box>
);
export default Header;
