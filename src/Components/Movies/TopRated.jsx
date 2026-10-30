import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/allmovie.css";
import "../../styles/stepbar.css";

function TopRated() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(500);

  const totalPages = 562;

  const apiurl =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" + page;

  useEffect(() => {
    fetch(apiurl, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.results || []);
      });
  }, [page]);

  const openMovieDetails = () => {
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
    setPage((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="popular-container mb-5">
        <h2 className="popular-title text-center mt-3 mb-5">
          Top Rated Movies
        </h2>

        <div className="movie-row">
          {data.map((item, index) => (
            <div
              className="movie-col"
              key={item.id}
              style={{ "--delay": `${index * 0.05}s` }}
            >
              <Link
                to={`/movieDetails/${item.id}`}
                className="movie-link"
                onClick={openMovieDetails}
              >
                <div className="movie-card">
                  <div className="movie-image-box">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      className="movie-image"
                      alt={item.title}
                      loading="lazy"
                    />

                    <div className="movie-overlay">
                      <span>View Details</span>
                    </div>
                  </div>

                  <div className="movie-body">
                    <h5>{item.title}</h5>

                    <div className="movie-rating">
                      ⭐{" "}
                      {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={previousPage}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <span className="page-info">
            Page {page} of {totalPages}
          </span>

          <button
            className="page-btn"
            onClick={nextPage}
            disabled={page === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default TopRated;
