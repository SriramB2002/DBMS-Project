import axios from 'axios';
import React,{useEffect, useState} from 'react'
import './Profile.css';
import { useContext } from 'react';
import { Box, ButtonGroup } from '@material-ui/core';
import  AuthContext  from '../Shared/AuthContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import AddBalance from './AddBalance';
const Profile = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const {auth,setAuth} = useContext(AuthContext);
    const [profile,setProfile] = useState({});
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState('');
    const [modal,setModal] = useState(false);
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
                first_name:data?.data[0]?.first_name,
                last_name:data?.data[0]?.last_name,
                password:''
            });
        }
        fetchData();
    }, []);
    // const onSubmit = async values => {
        
    //   };
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
 
    const addBalance = () => {
        setModal(true);
    }
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
    <ThemeProvider theme={darkTheme}>
        <div className='homepage' style={{paddingTop:'5rem'}}>
        <h1 className='he'>
            My Profile
        </h1>
        <h1 className='he' style={{marginTop:'1rem',fontSize:'1.5rem',color:'#E0E0E0'}}>Current Balance:  Rs. {profile.balance}</h1>
        <AddBalance open={modal} setOpen={setModal}/>
        <Paper className='container' elevation={24}>
        {!!profile.first_name && 
        <Paper style={{ padding: '3rem'}} elevation={24}>
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
        <ButtonGroup  fullWidth>
        <Button variant="contained" color="success" style={{padding:'1rem',color:'white'}} onClick={updateDetails}>Update Details</Button>
        <Button variant="contained" color="primary" style={{padding:'1rem',color:'white'}} onClick={addBalance}>Add Balance</Button>
        </ButtonGroup>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
        </Alert>
        </Snackbar>
        </Paper>
        </div>
        </ThemeProvider>

  )
}

export default Profile