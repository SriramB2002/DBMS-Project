import React, { useState } from "react";
import useForm from "../Shared/useForm";
import validate from "../Shared/RegisterValidationRules";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import  AuthContext  from "../Shared/AuthContext";
import Modal from "../Components/Modal";
const Form = props => {
  const {auth,setAuth} = useContext(AuthContext);
  const [open,setOpen] = useState(false);
  const register = async (data) => {
    try{
      const response = await axios.post("http://localhost:8080/register", {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name
      });
      console.log(response.data);
      setOpen(true);
      return;
    }
    catch(error){
      console.log(Object.keys(error),error.message);
    }
 
  }
  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    validate
  );



  return (
    <div className="section is-fullheight bg" style={{backgroundColor:'#424250',height:'100vh'}}>
      <Modal open={open} setOpen={setOpen} heading={"Successfully Registered"} text={"Thank You for Registering . You will now be redirected to Login Page ."} redirect={'/login'}/>
      {!!setAuth.token && <Redirect to="/Dashboard" />}
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box" style={{backgroundColor:'#33333D'}}>
          <h1 style={{textAlign:'center',color:'white',borderBottom:'none'}}>Register</h1>            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="label" style={{color:'white'}}>Email Address</label>
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
                <label className="label" style={{color:'white'}}>Password</label>
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
                <label className="label" style={{color:'white'}}>First Name</label>
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
                <label className="label" style={{color:'white'}}>Last Name</label>
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
                className="button is-block is-info is-fullwidth login-btn mt-5"
              >
                Register
              </button>
            </form>
            <div className="container mt-3"><Link to="/login" style={{color:'#EBF3F5'}}>Already Have an Account ? Login Here</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
