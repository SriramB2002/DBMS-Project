import "./Home.css";
import Parallax, { Layer } from "react-parallax-scroll";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import NavBar from "../Components/Navbar";
export default function Home() {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    return (
        <Parallax >
            {/* <NavBar /> */}
            <section>
                <Layer className="banner banner-2" settings={{ speed: 0.5 }} >
                     <div className="btngroup2" data-aos="zoom-in-down" data-aos-duration="900">
                        <Link to='/login'><Button className="btns2" data-aos="zoom-out" data-aos-duration="900">Login</Button></Link>
                        <Link to='/register'><Button className="btns2" data-aos="zoom-out" data-aos-duration="900">SignUp</Button></Link>
                    </div>
                    <div className="btngroup" data-aos="zoom-in-down" data-aos-duration="900">
                        <Link to='/login'><Button className="btns-new" data-aos="zoom-out" data-aos-duration="900">See Upcoming Matches</Button></Link>
                    </div>
                    <div data-aos="fade-up"><h1 className="logo-home">Welcome to <span className="stadia" ><b>Stadia</b></span></h1></div>
                    <div data-aos="zoom-out" data-aos-duration="1000" className="secondary-text">Book Tickets At Your <b>Ease</b> and Get <b>Cheapest</b> Rates</div>
                  
                </Layer>

            </section>
        </Parallax>
    );
}
