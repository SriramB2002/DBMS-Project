import * as React from 'react';
import NavBar from '../Components/AdminNavbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import './AdminDashboard.css';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { Table } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';
import { Paper } from '@mui/material';
import { TableHead } from '@mui/material';
import { textAlign } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [mname,setmname] = useState("");
  const [mprice,setmprice] = useState(0);
  const [mimg,setmimg] = useState("");

  const [fname, setfname] = useState("");
  const [fprice, setfprice] = useState(0);

  const [team, setTeam] = useState("");
  const [timg, settimg] = useState("");

  const [stName, setStName] = useState("");
  const [stCity, setStCity] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [country, setCountry] = useState("");
  const [premium, setPremium] = useState(0);
  const [normal, setNormal] = useState(0);

  const [team1, setFirst] = useState("");
  const [team2, setSecond] = useState("");
  const [format, setFormat] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(Date.now());
  const [stadium, setStadium] = useState("");

  const addMerch = async ()=> {
    const resp = await axios.post('http://localhost:8080/admin/addmerch', {
      merch_name: mname,
      merch_price: mprice,
      merch_image: mimg
    });
    console.log(resp);
  }

  const addFood = async () => {
    const resp = await axios.post('http://localhost:8080/admin/addfood', {
      food_name: fname,
      food_price: fprice
    });
    console.log(resp);
  }

  const addTeam = async () => {
    const resp = await axios.post('http://localhost:8080/admin/addteams', {
      team_name: team,
      team_flag: timg
    })
  }

  const addStadium = async () => {
    const resp = await axios.post('http://localhost:8080/admin/addstadium', {
      stadium_name: stName,
      city: stCity,
      country: country,
      capacity: capacity,
      premium_price: premium,
      normal_price: normal
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navbarItems=[];

  return (
    <div className='homepage1'>
      <NavBar navbarItems={navbarItems}/>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <br></br>
          <br></br>
          <br></br>
        <Tabs value={value} onChange={handleChange} textColor='#fff' centered aria-label="basic tabs example">
          <Tab label="Add Merch" {...a11yProps(0)} />
          <Tab label="Update Merch" {...a11yProps(1)} />
          <Tab label="Add Food" {...a11yProps(2)} />
          <Tab label="Update Food" {...a11yProps(3)} />
          <Tab label="Add Team" {...a11yProps(4)} />
          <Tab label="Add Stadium" {...a11yProps(5)} />
          <Tab label="New Match" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{maxWidth:'50vw',margin:'auto'}}>
        <h1>Add Merch</h1>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '420px'}} id="merch-name" type={'text'} label='Merch Name' value={mname} onChange={(e)=>setmname(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '210px'}} id="merch-price" type={'number'} label='Merch Price' value={mprice} onChange={(e)=>setmprice(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '650px'}} id="merch-image-url" type={'url'} label='Merch Image URL' value={mimg} onChange={(e)=>setmimg(e.target.value)}></TextField>
        <br></br>
        <br></br>
        <Button variant='contained' onClick={addMerch}>Add Merch</Button>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <h1>Update Merch</h1>
        <TableContainer>
          <Table sx={{backgroundColor: '#263238'}}>
            <TableHead>
              <TableCell style={{color: 'white', fontWeight: 'bold'}}>Merch Name</TableCell>
              <TableCell style={{color: 'white', fontWeight: 'bold'}}>Merch Image URL</TableCell>
              <TableCell style={{color: 'white', fontWeight: 'bold'}}></TableCell>
            </TableHead>
            <TableBody>
              <TableCell style={{color: 'white'}}>India Jersey</TableCell>
              <TableCell style={{color: 'white'}}>url1</TableCell>
              <TableCell>
                <Button variant='contained'>Update Booking</Button>
              </TableCell>
            </TableBody>
            <TableBody>
              <TableCell style={{color: 'white'}}>Australia Jersey</TableCell>
              <TableCell style={{color: 'white'}}>url2</TableCell>
              <TableCell>
                <Button variant='contained'>Update Booking</Button>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={2}>
      <h1>Add Food</h1>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '420px'}} id="food-name" type={'text'} label='Food Name' value={fname} onChange={(e) => setfname(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '210px'}} id="food-price" type={'number'} label='Food Price' value={fprice} onChange={(e) => setfprice(e.target.value)}></TextField>
        <br></br>
        <br></br>
        <Button variant='contained' onClick={addFood}>Add Food</Button>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <h1>Update Food</h1>
        <p>Table here</p>
      </TabPanel>

      <TabPanel value={value} index={4} style={{maxWidth:'50vw',margin:'auto'}}>
        <h1>Add Team</h1>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '650px'}} id="team-name" type={'text'} label='Team Name' value={team} onChange={(e) => setTeam(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '650px'}} id="team-image-url" type={'text'} label='Team Image URL' value={timg} onChange={(e) => settimg(e.target.value)}></TextField>
        <br></br>
        <br></br>
        <Button variant='contained' onClick={addTeam}>Add Team</Button>
      </TabPanel>

      <TabPanel value={value} index={5}>
        <h1>Add Stadium</h1>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '650px'}} id="stadium-name" type={'text'} label='Stadium Name' value={stName} onChange={(e) => setStName(e.target.value)}></TextField>
        <br></br>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '315px'}} id="stadium-city" type={'text'} label='City' value={stCity} onChange={(e) => setStCity(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '315px'}} id="stadium-country" type={'text'} label='Country' value={country} onChange={(e) => setCountry(e.target.value)}></TextField>
        <br></br>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '203px'}} id="stadium-capacity" type={'number'} label='Stadium Capacity' value={capacity} onChange={(e) => setCapacity(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '203px'}} id="premium-price" type={'number'} label='Premium Seat Price' value={premium} onChange={(e) => setPremium(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} style={{margin: '10px', width: '203px'}} id="normal-price" type={'number'} label='Normal Seat Price' value={normal} onChange={(e) => setNormal(e.target.value)}></TextField>
        <br></br>
        <br></br>
        <Button variant='contained' onClick={addStadium}>Add Stadium</Button>
      </TabPanel>

      <TabPanel value={value} index={6} style={{maxWidth:'50vw',margin:'auto'}}>
        <h1>New Match</h1>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} id="team-1" label="Team 1" select style={{margin: '10px', width: '340px'}}>
          <MenuItem>India</MenuItem>
        </TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} id="team-2" label="Team 2" select style={{margin: '10px', width: '340px'}}>
          <MenuItem>India</MenuItem>
        </TextField>
        <br></br>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} id="match-format" label="Match Format" type={'text'} style={{margin: '10px', width: '220px'}} value={format} onChange={(e) => setFormat(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} id="match-type" label="Match Type" type={'text'} style={{margin: '10px', width: '220px'}} value={type} onChange={(e) => setType(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} id="match-timestamp" label="" type={'datetime-local'} style={{margin: '10px', width: '220px'}} value={date} defaultValue={date} onChange={(e) => setDate(e.target.value)}></TextField>
        <TextField sx={{label: { color: 'lightgray'}, input: {color: 'white'}, fieldset: {borderColor: 'lightgray !important'}}} id="stadium" label="Stadium" select style={{margin: '10px', width: '700px'}}>
          <MenuItem>Rajiv Gandhi International Stadium, Hyderabad</MenuItem>
        </TextField>
        <br></br>
        <br></br>
        <Button variant='contained'>Organize Match</Button>
      </TabPanel>
    </Box>
    </div>
  );
  }