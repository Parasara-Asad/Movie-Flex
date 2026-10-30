import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/persondetails.css";

function PersonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPerson(res);
        window.scrollTo(0, 0);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
          accept: "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.cast || []);
      });
  }, [id]);

  const openDetails = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="tv-page mb-5">
        <div
          className="tv-background"
          style={{
            backgroundImage: person.profile_path
              ? `url(https://image.tmdb.org/t/p/original${person.profile_path})`
              : "none",
          }}
        >
          <div className="tv-background-overlay"></div>
        </div>

        <button className="tv-back" onClick={() => navigate(-1)}>
          ←
        </button>

        <main className="tv-details-box">
          <h1 className="tv-name">{person.name || "Loading..."}</h1>

          <div className="tv-tags">
            {person.known_for_department && (
              <span>{person.known_for_department}</span>
            )}
            {person.birthday && <span>Born: {person.birthday}</span>}
            {person.place_of_birth && <span>{person.place_of_birth}</span>}
          </div>

          {/* <p className="tv-overview">
            {person.biography || "No description available."}
          </p> */}

          <div className="tv-meta">
            <span>Popularity: {person.popularity?.toFixed(1) || "N/A"} ⭐</span>
          </div>

          <div className="tv-buttons">
            <button className="tv-favorite-btn">+ Add Favorite</button>
          </div>
        </main>

        <section className="tv-information text-center">
          <h2>Personal Information</h2>

          <div className="tv-info-grid">
            <div className="tv-info-card">
              <span>Known For</span>
              <strong>{person.known_for_department || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Gender</span>
              <strong>
                {person.gender === 1
                  ? "Female"
                  : person.gender === 2
                    ? "Male"
                    : "N/A"}
              </strong>
            </div>

            <div className="tv-info-card">
              <span>Birthday</span>
              <strong>{person.birthday || "N/A"}</strong>
            </div>

            <div className="tv-info-card">
              <span>Place of Birth</span>
              <strong>{person.place_of_birth || "N/A"}</strong>
            </div>
          </div>
        </section>

        <div className="popular-container mb-5">
          <div className="movie-row">
            {movies.slice(0, 12).map((item, index) => (
              <div
                className="movie-col"
                key={index}
                style={{ "--delay": `${index * 0.08}s` }}
              >
                <Link
                  to={
                    item.media_type === "movie"
                      ? `/moviedetails/${item.id}`
                      : `/tvshowdetails/${item.id}`
                  }
                  className="movie-link"
                  onClick={openDetails}
                >
                  <div className="movie-card">
                    <div className="movie-image-box">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="movie-image"
                        alt={item.title || item.name}
                      />
                    </div>

                    <div className="movie-body">
                      <h5>{item.title || item.name}</h5>

                      <div className="movie-rating">
                        ⭐ {item.vote_average?.toFixed(1) || "N/A"}
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

export default PersonDetails;
