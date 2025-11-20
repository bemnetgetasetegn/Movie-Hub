import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "./Layout";
import MovieDetails from "../Components/MovieDetails";
import Search from "../Components/SearchPage";
import NowPlayingMovies from "../Components/NowPlayingMovies";
import UpComingMovies from "../Components/UpComingMovies";
import LoginPage from "./AuthPage"; // Add this import
import SignUpPage from "./SignUpPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie", element: <HomePage /> },
      { path: "movie/now-playing", element: <NowPlayingMovies /> },
      { path: "movie/upcoming", element: <UpComingMovies /> },
      { path: "movie/:movieId", element: <MovieDetails /> },
      { path: "search", element: <Search /> },
    ],
  },
  { path: "login", element: <LoginPage /> }, // Add this route
  { path: "signup", element: <SignUpPage /> }, // Add this route
]);

export default route;
