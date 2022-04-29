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
import Matches from './Matches';
const Home = () => {
  //Selected Stadium Data
  const [stadium, setStadium] = useState({});
  const [capacity, setCapacity] = useState('');
  const [stadiumID,setstadiumID] = useState('');
  const [stadiumLocation,setstadiumLocation] = useState('');
  const [headerHidden,setheaderHidden] = useState(false);
  const {auth,setAuth} = useContext(AuthContext);
  const [filter,setFilter] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).token!==undefined){
      setAuth(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);
  const handleChange = (event) => {
    if(event.target.value=="See All Matches"){
      setStadium(event.target.value);
      setFilter(false);
    }
    setStadium(event.target.value);
    for (let i = 0; i < stadiumData.length; i++) {
      if (stadiumData[i].stadium_name === event.target.value) {
        setCapacity(stadiumData[i].capacity);
        setstadiumID(stadiumData[i].stadium_id);
        // setstadiumLocation(stadiumData[i].city + ", " + stadiumData[i].country);
        setFilter(true);
        return;
      }
    }
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
      {<div className='ge' data-aos="fade-up" data-aos-duratiion="1000"><h1 className='he'>Upcoming Matches</h1></div>}
      {<div className='ge-2' data-aos="fade-up" data-aos-duratiion="1000"><h1 className='he-2'>Click on Card for More Details</h1></div>}
      <div className='stadium-list'>
        {/* <FormControl fullWidth className={headerHidden ? 'header-hidden-modifications' : ''}>
          {console.log(stadium)}
        <InputLabel id="demo-simple-select-label">Select Stadium</InputLabel> */}
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stadium}
          label="Select Stadium"
          onChange={handleChange}
        >
          
          {stadiumData.length === 0 &&  <MenuItem value="" disabled>No Stadium Available Now ! Please Come Later</MenuItem>}
          <MenuItem value="See All Matches">Show Matches in All Stadiums</MenuItem>
          {stadiumData.map((stadiums,keyr) => {
            return (
              <MenuItem key={keyr} value={stadiums.stadium_name} className='menu-items'>
                <div>
                <div>
                {stadiums.stadium_name}
                </div>
                <div>
                <div className='stadium-details'> {stadiums.city}, {stadiums.country}</div>
                </div>
                </div>
              </MenuItem>
            )
          })}
  
        </Select> */}
        {/* </FormControl> */}
        {<Matches stadium_id={stadiumID} stadium={stadium} filter={filter} className='matches'/>}
        </div>
    </div>


  )
}

export default Home;