import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import loadScript from '../Shared/loadScript';
import { TextField } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useState, useContext} from 'react';
import  AuthContext  from '../Shared/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function AlertDialogSlide({open,setOpen}) {
  const {auth,setAuth} = useContext(AuthContext);
  const [alert,setAlert] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth.token}`
  };
  const handleCloser = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };
  const [amount,setAmount] = useState(0);
  const paymentSuccess = async () => {
    const data = await axios.post('http://localhost:8080/user/profile/updateBalance',{
        val:amount
    },{
        headers
    });
    setAlert(true);

    setOpen(false);
  }
  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    const data = await axios.post('http://localhost:8080/user/booking/razorpay', { 
        amount: amount*100,  
    });
    const options = {
      key: 'rzp_test_ZdRXkONBVZeKRJ',
      currency: 'INR',
      amount: amount*100,
      handler: function (response) {
        //Success
        paymentSuccess();

      },
      prefill: {
        name: "Yash Ratnani",
        email: 'yashratnani6@gmail.com',
        phone_number: '8767035529'
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }
  const addBalance = () => {
    displayRazorpay();
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Balance"}</DialogTitle>
        <DialogContent>
        <TextField id="standard-basic" label="Enter Amount" variant="standard" fullWidth style={{marginBottom:'0.5rem'}} value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          <DialogContentText id="alert-dialog-slide-description" style={{color:'grey',fontSize:'0.8rem'}}>
            You Will Be Redirected to Razorpay Payment Portal
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addBalance}>Proceed to Payment</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleCloser} severity="success" sx={{ width: '100%' ,background:'#B2FF59'}}>
          Balance Added Successfully ! Please Refresh the Page
        </Alert>
      </Snackbar>
    </div>
  );
}   