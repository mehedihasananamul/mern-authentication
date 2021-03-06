import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Login = () => {
  const [values, setValues] = useState({
    email: "mehedihasan.anamul@gmail.com",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting.." });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/login`,
      data: { email, password },
    })
      .then((response) => {
        console.log("LOGIN SUCCESS", response);

        // Save the response (user, token) in (LocalStorage/cookie)

        authenticate(response, () => {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          
          isAuth() && isAuth().role === "admin" ? (
            <Navigate to="/admin/profile" />
          ) : (
            <Navigate to="/user/profile" />
          );
        });
      })
      .catch((error) => {
        console.log("LOGIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const loginForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
          />
        </div>
        <Box sx={{ p: 1 }} display="flex" justifyContent="flex-end">                  
        <Box sx={{ pr: 1 }} display="flex" justifyContent="flex-start">                    
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger ">Forgot password</Link>
        </Box>
          <Button variant="contained" color="success" onClick={clickSubmit}>
            {buttonText}
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Navigate to="/" /> : null}
        {/* {JSON.stringify({ name, email, password })} */}
        <h1 className="p-5 text-center">Login</h1>
        {loginForm()}
        <br/>
      </div>
    </Layout>
  );
};
export default Login;
