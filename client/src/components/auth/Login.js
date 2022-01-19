import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useSelector,useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  //define all states
  const allStates = useSelector((state) => {
    return {
      auth: state.auth,
      errors : state.errors
    }
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors,setErrors] = useState({});

  useEffect(() => {

    setErrors(allStates.errors);

    if(allStates.auth.isAuthenticated){

      navigate('/dashboard');

    }

  },[allStates.errors,allStates.auth.isAuthenticated]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
    
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form noValidate className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            name="email"
            className={ classnames("form-control",{ "is-invalid": errors.email }) }
          />
          { errors.email && <div className="invalid-feedback">{errors.email}</div> }
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            name="password"
          className={ classnames("form-control",{ "is-invalid": errors.password }) }
          />
          { errors.password && <div className="invalid-feedback">{errors.password}</div> }
        </div>
        <input  type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
