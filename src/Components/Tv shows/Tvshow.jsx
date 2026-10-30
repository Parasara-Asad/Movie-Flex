import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/tvshow.css";

function Tvshow() {
  const [tvshow, setTvshow] = useState([]);
  const apiurl = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
  useEffect(() => {
    fetch(apiurl, {
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
      <div className="popular-container mb-5">
        <h2 className="popular-title mt-3 mb-5 text-center">Popular TV Shows</h2>

        <div className="movie-row">
          {tvshow.slice(0,18).map((item, index) => (
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
    </>
  );
}

export default Tvshow;
