import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const allStates = useSelector((state) => {
    return {
      auth: state.auth,
      errors : state.errors
    }
  })

  const navigate = useNavigate()


  useEffect(() =>{



    if(allStates.auth.isAuthenticated){

      navigate('/dashboard');

    }

  },[allStates.errors,allStates.auth])
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
