import React from 'react'
import FoodCard from './FoodCard';
import Grid from '@mui/material/Grid';
import { useState, useEffect,useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MerchCard from './MerchCard';
import { Button } from '@mui/material';
import AuthContext from '../Shared/AuthContext';
function AlertDialog({open,setOpen,food,merch,seats,match_id}) {
  const { auth, setAuth } = useContext(AuthContext); 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const bookseats = (data) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`
    };
      axios.post('http://localhost:8080/user/booking/createBooking',data,{
        headers:headers
      }
      ).then(res => {
          console.log(res);
          console.log(res.data);
      }).catch(function(error){
        console.log(error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });

  }
  const confirmBooking = (e) => {
    e.preventDefault();
    console.log(seats);
    console.log(food);
    console.log(merch);
    const seat = [];
    for(let i=0;i<seats.length;i++){
      for(let j=0;j<seats[i].length;j++){
        const elem = seats[i][j];
        if(!!elem.selected){
          seat.push({
            seat_id:elem.seat_id,
            seat_price:elem.seat_price,
            stadium_id:elem.stadium_id
          });
        }
      }
    }
    console.log(match_id);
    const data = {};
    data.seats = seat;
    data.food_list = [];
    data.merch_list = [];
    data.match_id = match_id;
    for(let i=0;i<merch.length;i++){
        if(!!merch[i].added){
            merch[i].merch_quantity = parseInt(merch[i].merch_quantity);
            data.merch_list.push(merch[i]);
        }
    }
    for(let i=0;i<food.length;i++){
      if(!!food[i].added){
        food[i].food_quantity = parseInt(food[i].food_quantity);
          data.food_list.push(food[i]);
      }
  }
  console.log(data);
  bookseats(data);
  setOpen(false);
  }
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Booking"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To Confirm Booking , Please Pay Rs. 1000
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmBooking} autoFocus>
            Proceed to Payment
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}
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

const MerchFood = (props) => {
  const stadiumData = props.location.state.stadiums;
  const match_id = props.location.state.id;
  const [food, setFood] = useState([]);
  const [merch, setMerch] = useState([]);
  const [open,setOpen] = useState(false);
  useEffect(() => {
    const fetchFood = async () => {
      const data = await axios.get('http://localhost:8080/get/getFood');
      console.log(data.data);
      setFood(data.data);
    }
    const fetchMerch = async () => {
      const data = await axios.get('http://localhost:8080/user/booking/merch/avail');
      setMerch(data.data);
    }
    fetchFood();
    fetchMerch();
    return () => {
    }
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const createBooking = () => {
      setOpen(1);
  }
  return (
    <div className=''>
      console.log(food,merch);
      <div className="container">
        <AlertDialog open={open} setOpen={setOpen} food={food} merch={merch} seats={stadiumData} match_id={match_id}/>
        <h1 className="he" style={{ paddingTop: '5rem' }}>Extras</h1>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '17rem', margin: 'auto' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Food" {...a11yProps(0)} style={{ color: 'white' }} />
            <Tab label="Merch" {...a11yProps(1)} style={{ color: 'white' }} />
            <Tab label="Cart" {...a11yProps(2)} style={{ color: 'white' }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {
              food.map((food_item, key) =>
                <Grid item xs={3} key={key}>
                  <FoodCard food_item={food_item} setfooditem={setFood} index=
                    {key} food={food} />
                </Grid>
              )
            }



          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>

            {
              merch.map((merch_item, key) =>
                <Grid item xs={3} key={key}>
                  <MerchCard merch_item={merch_item} setmerchitem={setMerch} index={key} merch={merch} />
                </Grid>
              )
            }
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={4}>

            {
              merch.map((merch_item, key) =>
    
                <Grid item xs={3} key={key} style={merch_item.added ? {}:{display:'none'}}>
                <MerchCard merch_item={merch_item} setmerchitem={setMerch} index={key} merch={merch} />
              </Grid>
              
              )
            }
  
            {
              food.map((food_item, key) =>
              
                 
                <Grid item xs={3} key={key} style={food_item.added ? {}:{display:'none'}}>
                <FoodCard food_item={food_item} setfooditem={setFood} index=
                  {key} food={food} />
              </Grid>
              
               
              )
            }



          </Grid>
          <div style={{display:'flex',alignItems:'center',marginTop:'2rem'}}>
          <Button size="medium" variant='contained' sx={{ color: 'white',margin:'auto'}} color="success" onClick={createBooking}>Confirm Booking</Button>
          </div>
        </TabPanel>

      </div>
    </div>
  )
}

export default MerchFood;