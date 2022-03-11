import React from "react";
import { mainTheme } from "../../App";
import { FilmProfile } from "../../services/api";
import "./FilmDetail.css";

interface FilmDetailProps {
  film: FilmProfile;
}

const FilmDetail: React.FC<FilmDetailProps> = (props: FilmDetailProps) => {
  const { film } = props;
  const ratingFound = film.Ratings.find(
    (rating) => rating.Source === "Internet Movie Database"
  );
  return (
    <div className="flexRow">
      <div>
        <img className="image" src={film.Poster} alt={film.Title} />
      </div>
      <div className="flexColumn rightFirstCol">
        <div className="head1">{film.Title}</div>
        <div
          className="normal2 midGreyColor"
          style={{
            color: mainTheme.palette.midGrey.main,
            marginTop: "-1em",
          }}
        >
          {`${film.Runtime} - ${film.Year} - ${film.Rated}`}
        </div>
        {ratingFound && (
          <div className="spaceTop head2">
            <img
              style={{ height: "1em", marginRight: "0.5em" }}
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="imdb"
            />
            {ratingFound.Value}
          </div>
        )}
        <div
          className="spaceTop head3"
          style={{
            color: mainTheme.palette.midGrey.main,
          }}
        >
          Overview
        </div>
        <div className="normal1">{film.Plot}</div>
        <div
          className="flexRow spaceTop"
          style={{ justifyContent: "space-between" }}
        >
          <SplitInLines header="Cast" line={film.Actors} />
          <SplitInLines header="Genre" line={film.Genre} />
          <SplitInLines header="Director" line={film.Director} />
          <SplitInLines header="Writers" line={film.Writer} />
        </div>
      </div>
    </div>
  );
};

interface SplitInLinesProps {
  header: string;
  line: string;
}

const SplitInLines: React.FC<SplitInLinesProps> = (
  props: SplitInLinesProps
) => {
  const itemLlist: string[] = props.line.split(", ");
  return (
    <div className="flexColumn">
      <div
        className="head3"
        style={{
          color: mainTheme.palette.midGrey.main,
        }}
      >
        {props.header}
      </div>
      {itemLlist.map((item) => (
        <div key={`li-${props.header}${item}`} className="normal1">
          {item}
        </div>
      ))}
    </div>
  );
};

export default FilmDetail;
