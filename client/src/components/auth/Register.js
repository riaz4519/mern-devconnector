import { useState } from "react";
import axios from "axios";
import classnames from "classnames";
import {useSelector,useDispatch} from 'react-redux';
import { registerUser } from "../../actions/authActions";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();


    dispatch(registerUser(formData));

    // axios
    //   .post("/api/users/register", formData)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => setErrors(err.response.data));
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form noValidate className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={onChange}
            className={classnames("form-control", {
              "is-invalid": errors.name,
            })}
          />
          {errors.name && <div class="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": errors.email,
        })}
          />
        {errors.email && <div class="invalid-feedback">{errors.email}</div>}
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": errors.password,
        })}
          />
            {errors.password && <div class="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": errors.password2,
        })}
          />
            {errors.password2 && <div class="invalid-feedback">{errors.password2}</div>}
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
  );
};

export default Register;
