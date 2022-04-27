import React, { useState, useEffect, useRef,useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import './Navbar.css';
import AuthContext from '../Shared/AuthContext';
function NavBar({navbarItems}) {
  const {auth,setAuth} = useContext(AuthContext);
  const [openDrawer, toggleDrawer] = useState(false);
  const history = useHistory();
  const drawerRef = useRef(null);
  useEffect(() => {
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }
      toggleDrawer(false);
    };
    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);
  const logout = () => {
    setAuth({});
    localStorage.setItem("auth",JSON.stringify({}));
    history.push('/login');
  };
  return (
    <Navbar.Wrapper>
      <div className="navbar-logo">
        <a className="link-logo" href="/">
          <p className="logo">
            Stadia
          </p>
        </a>
      </div>

      <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
        <HamburgerButton.Lines />
      </HamburgerButton.Wrapper>

      <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
        {navbarItems.map((item, index) => (
          <Navbar.Item key={index}>
            <Link className="link" to={item.path}>
              {item.name}
            </Link>
          </Navbar.Item>
        ))}
        <Navbar.Item>
            <Logout.Wrapper onClick={logout} style={{color:"red"}}>
              Logout
            </Logout.Wrapper>
        </Navbar.Item>
      </Navbar.Items>
    </Navbar.Wrapper>
  );
}

//Styled Components
const Navbar = {
  Wrapper: styled.nav`
    position: fixed;
    z-index: 2;
    flex: 1;
    align-self: flex-start;
    padding: 1rem 2rem;
    height: 5rem;
    width: 100%;
    margin: -0.5rem auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #15152d;
    box-shadow: 0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.2);

    //40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      z-index: 2;
      width: 100vw;
      top: 0;
    }
  `,

  Logo: styled.h1`
    position: relative;
    top: 15px;
    padding: 0 0 0 0;
    color: transparent;
  `,

  Items: styled.ul`
    display: flex;
    list-style: none;
    
    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;

      height: 100%;

      flex-direction: column;

      background-color: #ffffff;
      padding: 1rem 2rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,

  Item: styled.li`
    position: relative;
    top: 5px;
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25px;
    }
  `,

  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: #000000;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `
};
const Logout = {
  Wrapper: styled.div`
  margin-left: 10px;
  &:hover{
    background-color: rgba(249, 249, 249, 0.7);
    transform: scale(1.1);
    padding: 5px;
    border-radius: 5px;
    transition:all 0.1s ease-in-out;
    margin-top: -5px;
    margin-bottom: -5px;
  }
  `
}

export default NavBar;
