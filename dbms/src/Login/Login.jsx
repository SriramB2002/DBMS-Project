import React, { useEffect, useState } from "react";
import useForm from "../Shared/useForm";
import validate from "../Shared/LoginFormValidationRules";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import  AuthContext  from "../Shared/AuthContext";
import Modal from "../Components/Modal";

const Form = (props) => {
  const [open,setOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    if(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).token!==undefined && auth.token==undefined){
      setAuth(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);
  const login =  async (data) => {
    //Login Button is Pressed and We Got the Data
    console.log("Hi");
    try{
      const response = await axios.post("http://localhost:8080/login", {
        email: data.email,
        password: data.password
      });
      console.log(response.data);
      setAuth({token:response.data});
      localStorage.setItem("auth",JSON.stringify({token:response.data}));

      //Logout after 5 mins 
      return <Redirect to="/dashboard" />;
    }
    catch(error){
      console.log(Object.keys(error),error.message);
      setOpen(true);
    }
 
  }
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  return (

    <div className="section is-fullheight">
      {!!auth.token && <Redirect to="/Dashboard" />}
      <Modal heading={"Invalid Credentials"} text={"Password is Incorrect or the User Doesn't Exist"} open={open} setOpen={setOpen}/>
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
            <div className="container mt-3"><Link to="/register">Don't Have an Account ? Register Here</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
