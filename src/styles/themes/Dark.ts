import { createTheme } from "@mui/material";

const Dark = createTheme({
  palette: {
    primary: {
      main: "#FF8533",
      light: "#FF8533",
    },
    secondary: {
      main: "#212A42",
      light: "#212A42",
    },
    background: {
      default: "#212121",
    }
  },
});

export default Dark;