import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logoutUser } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [auth, setAuth] = useState({});
  const { isAuthenticated, user } = auth;

  const allStates = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onLogoutClick = (e) => {
    e.preventDefault();

    
     dispatch(logoutUser(navigate));
  };

  const authLinks = (
    <ul>
      <li>
        <img
          className="rounded-circle"
          style={{ width: "25px", marginRight: "5px" }}
          src={isAuthenticated ? user.avatar : ""}
        />
        <a href="#" onClick={onLogoutClick}>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  useEffect(() => {
    setAuth(allStates.auth);
  }, [allStates]);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
