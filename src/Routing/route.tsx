import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "./Layout";
import MovieDetails from "../Components/MovieDetails";
import Search from "../Components/SearchPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:movieId", element: <MovieDetails /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default route;
