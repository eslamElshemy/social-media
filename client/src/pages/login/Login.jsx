import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [cordinations, setCordinations] = useState({});

  const { dispatch, loading, error } = useContext(AuthContext);

  const handleChange = (e) => {
    setCordinations((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      dispatch({ type: "START_LOGIN" });
      let res = await axios.post(
        "http://localhost:8800/api/auth/login",
        cordinations, {withCredentials: true}
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="login">
      <div className="logContainer">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <div className="form">
            <input
              type="text"
              placeholder="Username"
              className="user"
              id="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="pass"
              id="password"
              onChange={handleChange}
            />
            {error && error}
            <button disabled={loading} onClick={handleLogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
