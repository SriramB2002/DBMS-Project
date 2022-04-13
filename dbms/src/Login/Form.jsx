import React, { useState } from "react";
import useForm from "../Shared/useForm";
import validate from "../Shared/LoginFormValidationRules";
import { Redirect } from "react-router-dom";
import axios from "axios";
const Form = props => {
  const login = (data) => {
    //Login Button is Pressed and We Got the Data
    authenticate(data);
    setLoggedIn(true);
    props.parentCallback(true);
    return <Redirect to="/Dashboard" />;
  }
  const authenticate = async (data) => {
    console.log(data);
      const response = await axios.post("http://localhost:8080/login", {
        email: data.email,
        password: data.password
      });
      console.log(response);
  }
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [loggedIn, setLoggedIn] = useState(null);



  return (
    <div className="section is-fullheight">
      {!!loggedIn && <Redirect to="/Dashboard" />}
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input ${errors.email && "is-danger"}`}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email || ""}
                    required
                  />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${errors.password && "is-danger"}`}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password || ""}
                    required
                  />
                </div>
                {errors.password && (
                  <p className="help is-danger">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
