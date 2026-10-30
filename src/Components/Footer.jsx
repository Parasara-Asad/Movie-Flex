import "../styles/footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="overlay">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-4">
                <h2 className="text-danger fw-bold">Movie Flex</h2>
                <p>
                  Watch thousands of movies, TV shows and discover trending
                  entertainment.
                </p>
              </div>
              <div className="col-md-2">
                <h5>Browse</h5>
                <ul className="list-unstyled">
                  <li>Home</li>
                  <li>Movies</li>
                  <li>Series</li>
                  <li>Trending</li>
                </ul>
              </div>

              <div className="col-md-3">
                <h5>Support</h5>
                <ul className="list-unstyled">
                  <li>Help Center</li>
                  <li>Privacy</li>
                  <li>Terms</li>
                </ul>
              </div>

              <div className="col-md-3">
                <h5>Follow Us</h5>
                <i className="bi bi-facebook fs-4 me-3"></i>
                <i className="bi bi-instagram fs-4 me-3"></i>
                <i className="bi bi-twitter-x fs-4 me-3"></i>
                <i className="bi bi-youtube fs-4"></i>
              </div>
            </div>

            <hr />

            <p className="text-center mb-0">
              © 2026 Movie Flex. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
