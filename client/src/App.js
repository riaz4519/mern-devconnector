import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      const decoded = jwt_decode(localStorage.jwtToken);

      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());

        //redirect to login page
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Landing />} />

            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
