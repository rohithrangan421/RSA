import { RouterProvider } from "react-router-dom";
import { FrappeProvider } from "frappe-react-sdk";
import PageRoutes from "./router/router";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <FrappeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={PageRoutes} />
      </ThemeProvider>
    </FrappeProvider>
  );
}

export default App;
