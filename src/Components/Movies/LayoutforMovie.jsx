import { Outlet } from "react-router-dom";
import MovieNavbar from "./MovieNavbar";

function LayoutforMovie() {
  return (
    <>
      <MovieNavbar />
      <Outlet />
    </>
  );
}

export default LayoutforMovie;
