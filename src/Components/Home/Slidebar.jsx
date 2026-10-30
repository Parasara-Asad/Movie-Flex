import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Slidebar.css";

function Slidebar() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiurl = "https://api.themoviedb.org/3/movie/now_playing";
    fetch(apiurl, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Now Playing Movies:", data);
        setMovies(data.results?.slice(0, 8) || []);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    if (movies.length === 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 7000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isHovered, movies.length]);

  if (movies.length === 0) {
    return (
      <div className="carousel-loading">
        <div className="spinner"></div>
        <p>Loading Now Playing Movies...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {movies.map((movie, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={movie.id}
              className={`carousel-slide-item ${isActive ? "active" : ""}`}
            >
              <div className="carousel-image-wrapper">
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt={movie.title}
                  className="carousel-image"
                />
              </div>

              <div className="carousel-overlay"></div>

              <div className="carousel-content">
                <div className="carousel-meta-row">
                  <span className="meta-badge year">
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "N/A"}
                  </span>

                  <span className="meta-divider">•</span>

                  <span className="meta-badge">NOW PLAYING</span>

                  <span className="meta-divider">•</span>

                  <span className="meta-badge">TMDB</span>
                </div>

                <h1 className="carousel-title">{movie.title}</h1>

                <p className="carousel-tagline">Now playing in theaters.</p>

                <div className="carousel-rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= Math.round(movie.vote_average / 2)
                            ? "star active"
                            : "star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="rating-text">
                    {movie.vote_average?.toFixed(1)} / 10
                  </span>
                </div>

                <p className="carousel-description">
                  {movie.overview ||
                    "Discover this movie now playing in theaters."}
                </p>

                <div className="carousel-btn-group">
                  <button
                    className="btn-carousel btn-secondary-custom"
                    onClick={() => navigate(`/movieDetails/${movie.id}`)}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />

                      <line x1="12" y1="16" x2="12" y2="12" />

                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    More Info
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <button
          className="carousel-arrow prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          ❮
        </button>

        <button
          className="carousel-arrow next"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          ❯
        </button>

        <div className="carousel-dots">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to movie ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-progress-bar">
          <div
            key={currentIndex}
            className={`carousel-progress-fill ${isHovered ? "paused" : ""}`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Slidebar;
