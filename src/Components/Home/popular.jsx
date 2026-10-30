import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/popular.css";

function Popular() {
  const [movie, setMovie] = useState([]);
  const apiurl =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  useEffect(() => {
    fetch(apiurl, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.results);
      });
  }, []);

  const openMovieDetails = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="popular-container mb-5">
        <h2 className="popular-title text-center mt-3 mb-5">Popular Movies</h2>

        <div className="movie-row">
          {movie.slice(0, 18).map((item, index) => (
            <div
              className="movie-col"
              key={item.id}
              style={{ "--delay": `${index * 0.08}s` }}
            >
              <Link
                to={`/movieDetails/${item.id}`}
                className="movie-link"
                onClick={openMovieDetails}
              >
                <div className="movie-card">
                  <div className="movie-image-box">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      className="movie-image"
                      alt={item.title}
                    />
                  </div>

                  <div className="movie-body">
                    <h5>{item.title}</h5>

                    <div className="movie-rating">
                      ⭐ {item.vote_average?.toFixed(1)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Popular;
