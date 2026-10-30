import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);

  const apiurl = "https://api.themoviedb.org/3/movie/" + id + "?language=en-US";

  // Movie Details
  useEffect(() => {
    fetch(apiurl, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [id]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
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

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/credits?language=en-US",
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
          accept: "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setCast(res.cast || []);
      });
  }, [id]);

  return (
    <>
      <div
        className="movie-main"
        style={{
          backgroundImage: data.backdrop_path
            ? `url("https://image.tmdb.org/t/p/original${data.backdrop_path}")`
            : "none",
        }}
      >
        <button className="movie-back-button" onClick={() => navigate(-1)}>
          ❮
        </button>

        <div className="movie-blue-box">
          <h1 className="movie-title text-white">{data.title}</h1>

          <div className="movie-genres">
            {data.genres?.slice(0, 3).map((genre) => (
              <button key={genre.id} className="movie-genre-button">
                {genre.name}
              </button>
            ))}
          </div>

          <p className="movie-description">{data.overview}</p>

          <div className="movie-action-buttons">
            <button className="add-favorite-button">Add Favorite</button>
          </div>
        </div>
      </div>

      <div className="container-fluid other-info">
        <div className="row">
          <div>
            <span>Language</span>
            <strong>{data.original_language || "N/A"}</strong>
          </div>

          <div>
            <span>Release Date</span>
            <strong>{data.release_date || "N/A"}</strong>
          </div>

          <div>
            <span>Budget</span>
            <strong>
              {data.budget ? `$${data.budget.toLocaleString()}` : "N/A"}
            </strong>
          </div>

          <div>
            <span>Runtime</span>
            <strong>{data.runtime ? `${data.runtime} min` : "N/A"}</strong>
          </div>
        </div>
      </div>

      <div className="container-fluid production-section">
        <p className="h3 production-title">Production Companies</p>

        <div className="row production-row">
          {data.production_companies?.map((item) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12"
              key={item.id}
            >
              <div className="production-card">
                {item.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.logo_path}`}
                    className="production-logo"
                    alt={item.name}
                  />
                ) : (
                  <div className="production-no-logo">No Logo</div>
                )}

                <div className="production-card-body">
                  <h5 className="production-name">{item.name}</h5>

                  <p className="production-country">
                    {item.origin_country || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid cast-section">
        <p className="h3 cast-title text-center">Cast</p>

        <div className="row cast-row">
          {cast.slice(0, 12).map((item) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12"
              key={item.id}
            >
              <Link
                to={`/person/${item.id}`}
                className="cast-link"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="cast-card">
                  {item.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                      className="cast-image"
                      alt={item.name}
                    />
                  ) : (
                    <div className="cast-no-image">No Image</div>
                  )}

                  <div className="cast-card-body">
                    <h5 className="cast-name">{item.name}</h5>

                    <p className="cast-character">
                      {item.character || "Unknown Character"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>


      <div className="container-fluid popular-section">
        <div className="popular-container">
          <div className="movie-row">
            {movie.slice(0, 12).map((item, index) => (
              <div
                className="movie-col"
                key={item.id}
                style={{
                  "--delay": `${index * 0.08}s`,
                }}
              >
                <Link
                  to={`/moviedetails/${item.id}`}
                  className="movie-link"
                  onClick={() => window.scrollTo(0, 0)}
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
      </div>
    </>
  );
}

export default MovieDetails;
