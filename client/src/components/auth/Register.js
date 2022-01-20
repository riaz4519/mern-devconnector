import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { registerUser  } from "../../actions/authActions";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";


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


    if(allStates.auth.isAuthenticated){

      navigate('/dashboard');

    }

  },[allStates.errors,allStates.auth])

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

        <TextFieldGroup
        type="text"
        placeholder="Name"
        value={name}
        name="name"
        onChange={onChange}
        error={errors.name}
        />

        <TextFieldGroup
          placeholder="Email address"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          error={errors.email}
          info="This site uses Gravatar so if you want a profile image, use a
        Gravatar email"
        />

        <TextFieldGroup
        type="password"
        placeholder="Password"
        name="password"
        minLength="6"
        value={password}
        onChange={onChange}
        error={errors.password}
        />

        <TextFieldGroup
        type="password"
        placeholder="Confirm Password"
        name="password2"
        minLength="6"
        value={password2}
        onChange={onChange}
        error={errors.password2}
        />
       
      
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
