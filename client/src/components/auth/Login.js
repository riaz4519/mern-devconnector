import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

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
      errors: state.errors,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(allStates.errors);

    if (allStates.auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [allStates.errors, allStates.auth.isAuthenticated]);

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
        <TextFieldGroup
          placeholder="Email address"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          error={errors.email}
        />

         <TextFieldGroup
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          name="password"
          error={errors.password}
        />
        

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
