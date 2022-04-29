import React from 'react'
import FoodCard from './FoodCard';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import MerchCard from './MerchCard';
import { Button } from '@mui/material';
import AuthContext from '../Shared/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import loadScript from '../Shared/loadScript';
import Modal from '../Components/Modal';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AlertDialog({ open, setOpen, food, merch, seats, match_id, alert, setAlert ,modal,setModal,setData}) {
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);
  const [checked,setchecked] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [balance, setBalace] = useState(0); 
  const [d, setD] = useState([]);
  const bookseats = (d, url) => {
    console.log(d, url);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`
    };
    axios.post(`http://localhost:8080/user/booking/createBooking${url}`, d, {
      headers: headers
    }
    ).then(res => {
      console.log(res);
      console.log(res.data);
      if(res.data=='Insufficient Balance'){
        setAlert({
          open: true,
          message: 'Insufficient Balance',
          severity: 'error'
        });
        setTimeout(() => {
          setAlert({
            open: false,
            message: "",
            severity: "success"
          })
        }, 5000);
        return;
      }
      //Booking Done SuccessFully
      setAlert({
        open: true,
        message: "Booking Done Successfully",
        severity: "success"
      });
      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          severity: "success"
        })
      }, 3000);
      setOpen(false);
      setModal(true);
    });
  }
  useEffect(()=>{
    let mounted = true;
    console.log(food,merch,seats);
    if(mounted){
      let temp = 0;
      if(food.length>0){
        food.forEach(food_item => {
          temp += parseInt(food_item.food_price)*parseInt(food_item.food_quantity);
          console.log(temp);
      });
      }
      if(merch.length>0){
        merch.forEach(merch_item => {
          temp += parseInt(merch_item.merch_price)*parseInt(merch_item.merch_quantity);
          console.log(temp);
        });
      }
      if(seats.length>0){
        seats.forEach(row => {
          row.forEach(seat => {
            if(seat.selected==true){
              temp += parseInt(seat.seat_price);
              console.log(temp);
            }
          });
        });
      }
      console.log(temp);
      setBalace(temp);
    }
    return ()=>{
      mounted = false;
    }
  },[food,merch,seats]);
  async function displayRazorpay(d) {
    console.log(d);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`
    };
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    const data = await axios.post('http://localhost:8080/user/booking/razorpay',{
      amount:balance
    });
    console.log("here2");
    const options = {
      key: 'rzp_test_ZdRXkONBVZeKRJ',
      currency: 'INR',
      amount: balance*100,
      name: 'Donation',
      handler: function (response) {
        //Success
        bookseats(d, 'Razorpay');
      },
      prefill: {
        name: "Yash",
        email: 'sdfdsjfh2@ndsfdf.com',
        phone_number: '9899999999'
      }
    }
    console.log("here3");
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const confirmBooking = (e) => {
    e.preventDefault();
    console.log(seats);
    console.log(food);
    console.log(merch);
    const seat = [];
    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        const elem = seats[i][j];
        if (!!elem.selected) {
          seat.push({
            seat_id: elem.seat_id,
            seat_price: elem.seat_price,
            stadium_id: elem.stadium_id,
            seat_type: elem.type
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
    for (let i = 0; i < merch.length; i++) {
      if (!!merch[i].added) {
        merch[i].merch_quantity = parseInt(merch[i].merch_quantity);
        data.merch_list.push(merch[i]);
      }
    }
    for (let i = 0; i < food.length; i++) {
      if (!!food[i].added) {
        food[i].food_quantity = parseInt(food[i].food_quantity);
        data.food_list.push(food[i]);
      }
    }
    console.log(data);
    //Give an Option
    setD(data);
    setData(data);
    //Op1
    if(!checked){
      displayRazorpay(data);
    }
    else{
      bookseats(data,'Balance');
    }
    //Op2
    // 
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
          To Confirm Booking , Please Pay Rs. {balance}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div>
        <div>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setchecked(e.target.checked)}/>} label="Continue to Pay with Balance" />
        </FormGroup>
        </div>
        <div>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirmBooking} autoFocus>
          Proceed to Payment
        </Button>
        </div>

        </div>
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
  const [data,setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: ""
  });
  useEffect(() => {
    const fetchFood = async () => {
      const datar = await axios.get('http://localhost:8080/get/getFood');
      console.log(datar.data);
      setFood(datar.data);
    }
    const fetchMerch = async () => {
      const datar = await axios.get('http://localhost:8080/user/booking/merch/avail');
      setMerch(datar.data);
    }
    fetchFood();
    fetchMerch();
    return () => {
    }
  }, []);
  const [modal,setModal] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const createBooking = () => {
    setOpen(1);
  }
  return (
    <div className='homepage'>
      console.log(food,merch);
      <div className="container">
        
        <AlertDialog open={open} setOpen={setOpen} food={food} merch={merch} seats={stadiumData} alert={alert} setAlert={setAlert} match_id={match_id} modal={modal} setModal={setModal} data={data} setData={setData}/>
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
                    {key} food={food}S/>
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

                <Grid item xs={3} key={key} style={merch_item.added ? {} : { display: 'none' }}>
                  <MerchCard merch_item={merch_item} setmerchitem={setMerch} index={key} merch={merch} />
                </Grid>

              )
            }

            {
              food.map((food_item, key) =>


                <Grid item xs={3} key={key} style={food_item.added ? {} : { display: 'none' }}>
                  <FoodCard food_item={food_item} setfooditem={setFood} index=
                    {key} food={food} />
                </Grid>


              )
            }



          </Grid>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
            <Button size="medium" variant='contained' sx={{ color: 'white', margin: 'auto' }} color="success" onClick={createBooking}>Confirm Booking</Button>
          </div>
        </TabPanel>
        <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert?.message}
          </Alert>
        </Snackbar>
        <Modal open={modal} setOpen={setModal} heading={"Payment Successful"} text={"You Will be Redirected to Billing Page in few seconds"} redirect={'/Dashboard/Bill'} data={data}/>

      </div>
    </div>
  )
}

export default MerchFood;