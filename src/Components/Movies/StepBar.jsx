import { Link, useSearchParams } from "react-router-dom";
import "../../Stepbar.css";

function StepBar() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  return (
    <div className="step-bar mb-5 mt-2">
      <Link
        to={`/movie?page=${page - 1}`}
        className={page === 1 ? "disabled-step" : ""}
      >
        <button className="step" disabled={page === 1}>
          ⬅️
        </button>
      </Link>

      <p>Page: {page}</p>

      <Link to={`/movie?page=${page + 1}`}>
        <button className="step" disabled={page === 500}>
          ➡️
        </button>
      </Link>
    </div>
  );
}

export default StepBar;
