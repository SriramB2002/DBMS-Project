import axios from 'axios';
import React,{useEffect, useState} from 'react'
import './Profile.css';
import { useContext } from 'react';
import  AuthContext  from '../Shared/AuthContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Profile = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const {auth,setAuth} = useContext(AuthContext);
    const [profile,setProfile] = useState({});
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState('');
    const [details,setDetails] = useState({
        first_name:profile.first_name,
        last_name:profile.last_name,
        password:''
    });
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('http://localhost:8080/user/profile/getProfile',{
                headers:{
                    'Authorization':'Bearer '+ auth.token
                }
            });
            console.log(data.data);
            setProfile(data.data[0]);
            setDetails({
                first_name:data.data.user.first_name,
                last_name:data.data.user.last_name,
                password:''
            })
        }
        fetchData();
    }, []);
    // const onSubmit = async values => {
        
    //   };
    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
 

    const handleChange = (prop) => (event) => {
        setDetails({ ...details, [prop]: event.target.value });
    };
    const updateDetails = async () => {
        console.log(details);
        try{
            const data = await axios.post('http://localhost:8080/user/profile/updateDetails',{
                ...details
            
        },{
            headers:{
                'Authorization':'Bearer '+ auth.token
            }
        });
        setMessage("Profile Updated Successfully");
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 5000);
        }
        catch(err){
            setMessage("Some Error Occured");
            setOpen(true);
        }
      
    }
  return (
    <div className='homepage' style={{paddingTop:'5rem'}}>
        <h1 className='he' style={{marginTop:'2rem'}}>
            My Profile
        </h1>
        <h1 className='he' style={{marginTop:'2rem'}}>Current Balance:  Rs.{profile.balance}</h1>
        <div className='container' style={{backgroundColor:'white',borderRadius:'2rem',padding:'2rem',paddingBottom:'2rem'}}>
        {!!profile.first_name && <Paper style={{ padding: '3rem',background:'#EEEEEE',borderRadius:'1rem' }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="first_name"
                    label="First Name"
                    value={profile.first_name}
                    onChange={handleChange('first_name')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    value={profile.last_name}
                    onChange={handleChange('last_name')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Enter New Password"
                    type="password"
                    value={details.password}
                    onChange={handleChange('password')}
                  />
                </Grid>
                </Grid>
        </Paper>}
        <Button variant="contained" color="success" style={{marginTop:'2rem',padding:'1rem',borderRadius:'0.8rem'}} fullWidth onClick={updateDetails}>Update Details</Button>
    
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
        </Alert>
        </Snackbar>
        </div>
        
        </div>
  )
}

export default Profile