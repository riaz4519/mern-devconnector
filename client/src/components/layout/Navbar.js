import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";

const Navbar = () => {

  const [auth,setAuth] = useState({});

  const allStates = useSelector((state) => {
    return {
      auth : state.auth
    }
  });

  const {isAuthenticated,user} = auth;

  useEffect(() =>{

      setAuth(allStates.auth);

  },[allStates])
    return (

             <nav className="navbar bg-dark">
              <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
              </h1>
              <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </nav>


    );
}
 
export default Navbar;