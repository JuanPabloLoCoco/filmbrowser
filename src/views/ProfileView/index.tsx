import React, { useEffect, useState } from "react";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import "./ProfileView.css";
import { mainTheme } from "../../App";
import FilmDetail from "../../components/FilmDetail";
import CommentList, { Comment } from "../../components/CommentList";
import { filmApi } from "../../services/api";
import CommentForm from "../../components/CommentForm";
import { LocalStorageFilm } from "../../components/FilmList";

interface ProfileViewProps {
  filmId: string;
  onReturn?: () => void;
}

export interface FilmRating {
  Source: string;
  Value: string;
}

const comments: Comment[] = [
  {
    id: 1,
    name: "id labore ex et quam laborum",
    description:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    description:
      "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
  {
    id: 3,
    name: "odio adipisci rerum aut animi",
    description:
      "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
  },
  {
    id: 4,
    name: "alias odio sit",
    description:
      "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
  },
  {
    id: 5,
    name: "vero eaque aliquid doloribus et culpa",
    description:
      "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
  },
];

const ProfileView: React.FC<ProfileViewProps> = (props: ProfileViewProps) => {
  const [filmStored, setFilmStored] = useState<Partial<LocalStorageFilm>>({});

  const {
    data: film,
    isLoading,
    isError,
  } = filmApi.useGetFilmByIdQuery({
    id: props.filmId,
  });
  useEffect(() => {
    // @ts-ignore
    const filmStored: Partial<LocalStorageFilm> = JSON.parse(
      localStorage.getItem(props.filmId) || "{}"
    );
    setFilmStored(filmStored);
  }, []);

  const handleReturn = () => {
    if (props.onReturn) {
      props.onReturn();
    }
  };

  const handleOnSubmitComment = (comment: Comment) => {
    const updatedFilm: Partial<LocalStorageFilm> = {
      ...filmStored,
      comment,
    };
    localStorage.setItem(props.filmId, JSON.stringify(updatedFilm));
    setFilmStored(updatedFilm);
  };

  return (
    <>
      {isError && <div>Error getting film</div>}
      {isLoading && <div>Getting Film information</div>}
      {film && (
        <div className="flexColumn">
          <div>
            <div
              className="lightGreyColor"
              style={{
                width: "fit-content",
                color: mainTheme.palette.lightGrey.main,
              }}
              onClick={handleReturn}
            >
              <ArrowRightAltRoundedIcon className="backArrow" />
            </div>
          </div>
          <FilmDetail film={film} />
          <br />
          <br />
          <div className="head2">Commentary</div>
          {!filmStored.comment && (
            <CommentForm onComment={handleOnSubmitComment} />
          )}
          <CommentList list={comments} myComment={filmStored.comment} />
        </div>
      )}
    </>
  );
};

export default ProfileView;
