import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilmRating } from "../../views/ProfileView";

export enum API_TAG {
  Film = "film",
  Query = "query",
}

interface SearchFilmsResponse {
  Search: FilmSummary[];
  totalResults: string;
  Response: string;
}

interface SearchFilmsRequest {
  query: string;
}

export interface FilmSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface FilmProfile {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: FilmRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface GetFilmByIdRequest {
  id: string;
}

export const filmApi = createApi({
  reducerPath: "imdbAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),
  tagTypes: [API_TAG.Film, API_TAG.Query],
  endpoints: (builder) => ({
    searchFilms: builder.query<FilmSummary[], SearchFilmsRequest>({
      query: (req) => `?s=${req.query}&apikey=81db424a`,
      transformResponse: (res: SearchFilmsResponse) => {
        return res.Search;
      },
      providesTags: (result, error, request) => [
        { type: API_TAG.Query, id: request.query },
      ],
    }),
    getFilmById: builder.query<FilmProfile, GetFilmByIdRequest>({
      query: (req) => `?i=${req.id}&apikey=81db424a&plot=full`,
      providesTags: (res, err, req) => [{ type: API_TAG.Film, id: req.id }],
    }),
  }),
});
