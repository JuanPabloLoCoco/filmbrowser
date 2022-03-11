import { Search } from "@mui/icons-material";
import { Box, Input, InputAdornment, Typography } from "@mui/material";
import React, { useState } from "react";
import { mainTheme } from "../../App";
import FilmList, { FilmSummary } from "../../components/FilmList";
import noFilm from "../../noFilm.png";

interface SearchViewProps {
  filmList: FilmSummary[];
  onSelectFilm?: (filmId: string) => void;
  onChangeQuery?: (query: string) => void;
  query: string;
}

const SearchView: React.FC<SearchViewProps> = (props: SearchViewProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeQuery) {
      props.onChangeQuery(event.target.value);
    }
  };

  return (
    <>
      <Box
        height={"45px"}
        borderColor={mainTheme.palette.midGrey.main}
        border={"1px"}
        borderRadius={"5px"}
        bgcolor={mainTheme.palette.white.main}
        className="itemSeparation lightGreyBC"
      >
        <Input
          fullWidth
          disableUnderline
          onChange={handleInputChange}
          startAdornment={
            <InputAdornment position="start" className="imageMargin">
              <Search />
            </InputAdornment>
          }
          className="normal1"
          value={props.query}
        />
      </Box>

      {props.filmList.length > 0 ? (
        <FilmList filmList={props.filmList} onClickFilm={props.onSelectFilm} />
      ) : (
        <EmptyMessage />
      )}
    </>
  );
};

function EmptyMessage() {
  return (
    <div
      style={{
        width: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={noFilm}
        style={{ width: "25%", marginTop: "3em", marginBottom: "1em" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span className="head2">Don't know what to search?</span>
        <span
          className="head4"
          style={{
            color: mainTheme.palette.midGrey.main,
          }}
        >
          Here's an offer you can't refuse
        </span>
      </div>
    </div>
  );
}

export default SearchView;
