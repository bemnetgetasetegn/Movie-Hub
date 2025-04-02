import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "./Layout";
import MovieDetails from "../Components/MovieDetails";
import Search from "../Components/SearchPage";
import NowPlayingMovies from "../Components/NowPlayingMovies";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie", element: <HomePage /> },
      { path: "movie/now-playing", element: <NowPlayingMovies /> },
      { path: "movie/:movieId", element: <MovieDetails /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default route;
