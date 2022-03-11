import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { mainTheme } from "../../App";
import { Comment } from "../CommentList";

interface FilmListProps {
  filmList: FilmSummary[];
  onClickFilm?: (filmId: string) => void;
}

export interface FilmSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const FilmList: React.FC<FilmListProps> = (props: FilmListProps) => {
  const { filmList } = props;
  return (
    <Grid container>
      {filmList.map((film) => {
        return (
          <FilmItem
            film={film}
            onClickFilm={props.onClickFilm}
            key={`fli-${film.Title}${film.imdbID}`}
          />
        );
      })}
    </Grid>
  );
};

export default FilmList;

interface FilmItemProps {
  film: FilmSummary;
  onClickFilm?: (filmId: string) => void;
}

export interface LocalStorageFilm {
  isFavorite: boolean;
  comment?: Comment;
}

const FilmItem: React.FC<FilmItemProps> = (props: FilmItemProps) => {
  const { film } = props;

  const [filmStored, setFilmStored] = useState<Partial<LocalStorageFilm>>({});

  useEffect(() => {
    // @ts-ignore
    const filmStored: Partial<LocalStorageFilm> = JSON.parse(
      localStorage.getItem(props.film.imdbID) || "{}"
    );
    setFilmStored(filmStored);
  }, []);

  const handleClickFilm = () => {
    if (props.onClickFilm) {
      props.onClickFilm(props.film.imdbID);
    }
  };

  const handleSetFavorite = () => {
    const updatedFilm: Partial<LocalStorageFilm> = {
      ...filmStored,
      isFavorite: !filmStored.isFavorite,
    };
    localStorage.setItem(props.film.imdbID, JSON.stringify(updatedFilm));
    setFilmStored(updatedFilm);
  };

  return (
    <Grid
      item
      xs={3}
      style={{
        height: "370px",
        width: "250px",
        backgroundImage: film.Poster,
      }}
      className="container"
    >
      <div
        style={{
          position: "absolute",
          marginTop: "1em",
          display: "flex",
          justifyContent: "end",
          width: "inherit",
          cursor: "pointer",
        }}
      >
        <div
          className="lightGreyBg"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: mainTheme.palette.lightGrey.main,
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleSetFavorite}
        >
          {filmStored.isFavorite ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </div>
      </div>

      <img
        src={film.Poster}
        style={{
          borderRadius: "10px",
          padding: ".5em",
          width: "inherit",
          height: "-webkit-fill-available",
          display: "block",
          zIndex: -1,
        }}
        alt={film.Title}
        onClick={handleClickFilm}
      />
    </Grid>
  );
};
