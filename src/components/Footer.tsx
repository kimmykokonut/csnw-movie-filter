import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 1,
        bgcolor: "secondary.main",
      }}
    >
      built by&nbsp;
      <a
        href="https://github.com/kimmykokonut"
        style={{ textDecoration: "none", color: "gold" }}
      >
        kimmykokonut
      </a>
    </Box>
  );
};
export default Footer;
