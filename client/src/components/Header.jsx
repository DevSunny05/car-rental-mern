import { Link } from "react-router";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fa fa-car"></i> Car Rental
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/cars"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/about"}
                  className="nav-link active"
                  aria-current="page"
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/contact"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/register"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
