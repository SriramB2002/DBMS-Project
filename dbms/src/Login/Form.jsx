import React, { useState,useEffect } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginst } from "../Reducers/LoginReducer";
import { login } from "../Reducers/UserReducer";
const Form = props => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const loggedIn = useSelector((state)=>(state.loginReducer.value.isloggedIn));
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginst(localStorage.getItem('isloggedIn')=='true'));
    
  },[]);
  //after clicking on login button
  function login() {
    if(loggedIn==true){
      localStorage.setItem("isloggedIn", loggedIn);
      return;
    }
    
    dispatch(loginst(true));
    localStorage.setItem("isloggedIn", true);
    
    return <Redirect to="/Dashboard" />;
  }
  //UI for Form
  return (
    <div className="section is-fullheight">
      {loggedIn==true && <Redirect to="/Dashboard" />}
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
