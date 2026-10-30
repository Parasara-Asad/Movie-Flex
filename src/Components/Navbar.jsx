import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="container-fluid custom-navbar py-2">
        <div className="row align-items-center">
          <div className="col-12 col-lg-3 p-2">
            <div className="brand-section d-flex align-items-center justify-content-center justify-content-lg-start">
              <div
                className="profile-wrapper"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src="https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_test_b&w=740&q=80"
                  alt="profile"
                  className="profile-img"
                />
              </div>

              <span className="logo-text">Asad Parasara</span>
            </div>
          </div>

          <div className="col-12 col-lg-5 p-2">
            <ul className="nav justify-content-center navbar-links">
              <li className="nav-item">
                <Link className="nav-link" to="/Home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Movie">
                  Movie
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/tvshow">
                  TV Shows
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-4 p-2">
            <form className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
              />

              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
