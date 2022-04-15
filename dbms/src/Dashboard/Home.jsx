import React, { useState, useEffect,useContext} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Aos from "aos";
import axios from 'axios';
import "aos/dist/aos.css";
import './Home.css';
import AuthContext from '../Shared/AuthContext';
const Home = () => {
  //Selected Stadium Data
  const [stadium, setStadium] = useState({});
  const {auth,setAuth} = useContext(AuthContext);
  const handleChange = (event) => {
    setStadium(event.target.value);
  };
  const [stadiumData, setStadiumData] = useState([]);
  useEffect(() => {
    console.log(auth)
    const fetchData = async () => {
      const result = await axios('http://localhost:8080/get/stadiums',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      });
      const data = result.data;
      console.log(data);
      setStadiumData(data);
    };
    fetchData();
  }, []);

  return (
    <div className='paddedr'>
      <div className='homepage' style={{ height: '200vh', paddingTop: '5rem' }}>
      </div>
      <div className='ge' data-aos="fade-up" data-aos-duratiion="1000"><h1 className='he'>See Stadiums Near Me</h1></div>
      <div className='stadium-list'>
        <FormControl fullWidth>
          {console.log(stadium)}
        <InputLabel id="demo-simple-select-label">Select Stadium</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stadium}
          label="Select Stadium"
          onChange={handleChange}
        >
    
          {stadiumData.length === 0 &&  <MenuItem value="" disabled>No Stadium Available Now ! Please Come Later</MenuItem>}
          {stadiumData.map((stadiums,keyr) => {
            return (
              <MenuItem key={keyr} value={stadiums.stadium_name} className='menu-items'>
                {stadiums.stadium_name}
                {console.log(stadiums.stadium_name,stadium) && stadiums.stadium_name!=stadium &&  <div><div className='stadium-details'>{stadiums.city}, {stadiums.country}</div></div>}
              </MenuItem>
            )
          })}
  
        </Select>
        </FormControl>
        </div>
    </div>


  )
}

export default Home;