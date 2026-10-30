import { NavLink } from "react-router-dom";
import "../../styles/MovieNavbar.css";

function MovieNavbar() {
  return (
    <>
      {" "}
      <div className="movie-navbar">
        <NavLink
          to="/movie"
          end
          className={({ isActive }) =>
            isActive ? "movie-option active" : "movie-option"
          }
        >
          All Movies
        </NavLink>
        <NavLink
          to="/movie/top-rated"
          className={({ isActive }) =>
            isActive ? "movie-option active" : "movie-option"
          }
        >
          Top Rated
        </NavLink>
      </div>
    </>
  );
}

export default MovieNavbar;
