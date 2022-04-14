import React, { useState } from "react";
import useForm from "../Shared/useForm";
import validate from "../Shared/LoginFormValidationRules";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const Form = props => {
  const login = async (data) => {
    try{
      const response = await axios.post("http://localhost:8080/register", {
        email: data.email,
        password: data.password
      });
      console.log(response.data);
      setLoggedIn(true);
      props.parentCallback(true);
      return <Redirect to="/Dashboard" />;
    }
    catch(error){
      console.log(Object.keys(error),error.message);
    }
 
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
            <h1>Register</h1>
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

              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input ${errors.first_name && "is-danger"}`}
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={values.first_name || ""}
                    required
                  />
                  {errors.first_name && (
                    <p className="help is-danger">{errors.first_name}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input ${errors.last_name && "is-danger"}`}
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={values.last_name || ""}
                    required
                  />
                  {errors.last_name && (
                    <p className="help is-danger">{errors.last_name}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Register
              </button>
            </form>
            <div className="container mt-3"><Link to="/login">Already Have an Account ? Login Here</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
