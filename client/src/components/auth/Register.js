import { useState ,useEffect} from "react";

import classnames from "classnames";
import { useSelector } from "react-redux";
import { registerUser  } from "../../actions/authActions";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  
  const [errors,setErrors] = useState({});

  //const [errors, setErrors] = useState({});

  const { name, email, password, password2 } = formData;

  const allStates = useSelector((state) => {
    return {
      auth: state.auth,
      errors : state.errors,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() =>{

    setErrors(allStates.errors);

  },[allStates.errors])

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData,navigate));
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
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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

          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
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
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
