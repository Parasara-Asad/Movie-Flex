import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/TVshowDetails.css";

function TVshowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setShow(res);
        window.scrollTo(0, 0);
      });
  }, [id]);

  const [tvshow, setTvshow] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCast(res.cast || []);
      });
  }, [id]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTvshow(res.results);
      });
  }, []);

  const openTvDetails = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="tv-page mb-5">
        <div
          className="tv-background"
          style={{
            backgroundImage: show.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`
              : "none",
          }}
        >
          <div className="tv-background-overlay"></div>
        </div>

        <button className="tv-back" onClick={() => navigate("/tvshow")}>
          ←
        </button>

        <main className="tv-details-box">
          <h1 className="tv-name">{show.name || "Loading..."}</h1>

          <div className="tv-tags">
            {show.genres?.slice(0, 4).map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <p className="tv-overview">
            {show.overview || "No description available."}
          </p>

          <div className="tv-meta">
            <span>Rating: {show.vote_average?.toFixed(1) || "N/A"} ⭐</span>
          </div>

          <div className="tv-buttons">
            <button className="tv-favorite-btn">+ Add Favorite</button>
          </div>
        </main>

        <section className="tv-information text-center">
          <h2>Show Information</h2>

          <div className="tv-info-grid">
            <div className="tv-info-card">
              <span>Original Language</span>
              <strong>{show.original_language?.toUpperCase() || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Status</span>
              <strong>{show.status || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>First Air Date</span>
              <strong>{show.first_air_date || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Last Air Date</span>
              <strong>{show.last_air_date || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Seasons</span>
              <strong>{show.number_of_seasons || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Episodes</span>
              <strong>{show.number_of_episodes || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Popularity</span>
              <strong>{show.popularity?.toFixed(1) || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Vote Count</span>
              <strong>{show.vote_count?.toLocaleString() || "N/A"}</strong>
            </div>
          </div>
        </section>

        {show.production_companies?.length > 0 && (
          <section className="tv-production">
            <h2>Production Companies</h2>

            <div className="production-grid">
              {show.production_companies.slice(0, 5).map((company) => (
                <div className="production-item" key={company.id}>
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                      alt={company.name}
                    />
                  ) : (
                    <div className="company-name">{company.name}</div>
                  )}

                  <p>{company.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {cast.length > 0 && (
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
        )}
        <div className="popular-container mb-5">
          <div className="movie-row">
            {tvshow.slice(0, 12).map((item, index) => (
              <div
                className="movie-col"
                key={item.id}
                style={{ "--delay": `${index * 0.08}s` }}
              >
                <Link
                  to={`/tvshowdetails/${item.id}`}
                  className="movie-link"
                  onClick={openTvDetails}
                >
                  <div className="movie-card">
                    <div className="movie-image-box">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="movie-image"
                        alt={item.name}
                      />
                    </div>

                    <div className="movie-body">
                      <h5>{item.name}</h5>

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

export default TVshowDetails;
