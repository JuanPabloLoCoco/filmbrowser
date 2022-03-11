import { useState } from "react";
import tvLogo from "./tv.png";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import SearchView from "./views/SearchView";
import ProfileView from "./views/ProfileView";
import { filmApi } from "./services/api";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    dark: Palette["primary"];
    primaryGrey: Palette["primary"];
    midGrey: Palette["primary"];
    lightGrey: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
    dark: PaletteOptions["primary"];
    primaryGrey: PaletteOptions["primary"];
    midGrey: PaletteOptions["primary"];
    lightGrey: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
}

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#FF9F1C",
    },
    secondary: {
      main: "#FF4040",
    },
    tertiary: {
      main: "#2EC486",
    },
    dark: {
      main: "#0A1014",
    },
    primaryGrey: {
      main: "#182329",
    },
    midGrey: {
      main: "#353F4C",
    },
    lightGrey: {
      main: "#7A8C99",
    },
    white: {
      main: "#FFFFFF",
    },
  },
});

function App() {
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);

  const [query, setQuery] = useState<string>("");

  const [getSearch, result, lastPromiseInfo] =
    filmApi.useLazySearchFilmsQuery();

  const handleProfileReturn = () => {
    setSelectedFilm(null);
  };

  const handleSelectFilm = (filmId: string) => {
    setSelectedFilm(filmId);
  };

  const handleChangeQuery = (query: string) => {
    getSearch({ query });
    setQuery(query);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="primary">
        <Container fixed>
          <Grid container className="itemSeparation">
            <Grid xs={1} className={"centerImage"} item>
              <img src={tvLogo} className="logo" />
            </Grid>
            <Grid xs={11} item>
              <div className="head2">MovieBox</div>
            </Grid>
          </Grid>
          <Grid container className="itemSeparation"></Grid>
          {selectedFilm == null ? (
            <SearchView
              filmList={result.data && query.length > 0 ? result.data : []}
              onSelectFilm={handleSelectFilm}
              query={query}
              onChangeQuery={handleChangeQuery}
            />
          ) : (
            <ProfileView onReturn={handleProfileReturn} filmId={selectedFilm} />
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
