import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material';
import { Grid } from '@material-ui/core';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Bill.css';
const BillBreakout = (props) => {
  const [price, setprice] = useState(0);
  const [fp, setfp] = useState(0);
  const [mp, setmp] = useState(0);
  const [sp, setsp] = useState(0);
  const [seats,setseats] = useState({
    premium:{
      price:0,
      count:0
    },
    normal:{
      price:0,
      count:0
    }
  });
  const data = props.location.state.data;
  {console.log(data)}
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let temp = 0;
      if (data.food_list.length > 0) {
        let temp1 = 0;
        data.food_list.forEach(food_item => {
          temp += parseInt(food_item.food_price) * parseInt(food_item.food_quantity);
          temp1 += parseInt(food_item.food_price) * parseInt(food_item.food_quantity);
        });
        setfp(temp1);
      }
      if (data.merch_list.length > 0) {
        let temp1 = 0;
        data.merch_list.forEach(merch_item => {
          temp += parseInt(merch_item.merch_price) * parseInt(merch_item.merch_quantity);
          temp1 += parseInt(merch_item.merch_price) * parseInt(merch_item.merch_quantity);
        });
        setmp(temp1);
      }
      if (data.seats.length > 0) {
        let temp1 = 0;
        let premium = {
          count:0,
          price:0
        };
        let normal = {
          count:0,
          price:0
        };
        data.seats.forEach(seat => {
          if(seat.seat_type=='Normal'){
            normal.count++;
            normal.price = seat.seat_price;
          }
          else{
            premium.count++;
            premium.price = seat.seat_price;
          }
          temp += parseInt(seat.seat_price);
          temp1 += parseInt(seat.seat_price);
        });
        setseats({
          premium,
          normal
        })
        setsp(temp1);
      }
      console.log(temp);
      setprice(temp);
    }
    return () => {
      mounted = false;
    }
  }, []);
  return (
    <div className='homepage' style={{ paddingTop: '5rem', width: '100%', margin: 'auto' }}>
      <ThemeProvider theme={darkTheme}>

        <Paper elevation={8} sx={{ width: '80%', margin: 'auto', height: '85vh', boxShadow: 5 }}>
          <h1 style={{ paddingTop: '1rem' }}>Booking Summary</h1>
          <Grid container spacing={2} style={{ width: '90%', margin: 'auto' }}>
            <Grid item xs={6}>
              <Paper
                textAlign='center' lineHeight='60px' elevation={100} sx={{ height: '40vh',overflow:'scroll' }}
                className='_paper'
              >
                <h1 style={{ paddingTop: '1rem' }}>Food</h1>
                <div style={{ width: '90%', margin: 'auto' }}>
                  <TableContainer component={Paper} elevation={24} style={{marginBottom:'2rem'}}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Food Item</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          data.food_list.map((food_item) => {
                            return (
                              <TableRow component={Paper} elevation={70}>
                                <TableCell align="right">{food_item.food_name}</TableCell>
                                <TableCell align="right">&#8377;{food_item.food_price}</TableCell>
                                <TableCell align="right">{food_item.food_quantity}</TableCell>
                                <TableCell align="right">&#8377;{food_item.food_quantity * food_item.food_price}</TableCell>
                              </TableRow>
                            );
                          })
                        }
                        <TableRow component={Paper} elevation={1000}>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right">Total Price</TableCell>
                          <TableCell align="right">&#8377;{fp}</TableCell>
                        </TableRow>


                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                textAlign='center' lineHeight='60px' elevation={100} sx={{ height: '40vh',overflow:'scroll' }}
                className='_paper'
              >
                <h1 style={{ paddingTop: '1rem' }}>Merch</h1>
                <div style={{ width: '90%', margin: 'auto' }}>
                  <TableContainer component={Paper} elevation={24} style={{marginBottom:'2rem'}}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Merch Item</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          data.merch_list.map((merch_item) => {
                            return (
                              <TableRow component={Paper} elevation={70}>
                                <TableCell align="right">{merch_item.merch_name}</TableCell>
                                <TableCell align="right">&#8377;{merch_item.merch_price}</TableCell>
                                <TableCell align="right">{merch_item.merch_quantity}</TableCell>
                                <TableCell align="right">&#8377;{merch_item.merch_quantity * merch_item.merch_price}</TableCell>
                              </TableRow>
                            );
                          })
                        }
                        <TableRow component={Paper} elevation={1000}>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right">Total Price</TableCell>
                          <TableCell align="right">&#8377;{mp}</TableCell>
                        </TableRow>


                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper
                textAlign='center' lineHeight='60px' elevation={100} sx={{ height: '25vh',overflow:'scroll',overflow:'scroll' }}
                className='_paper'
              >
            <h1 style={{ paddingTop: '1rem' }}>Seats</h1>
            <div style={{ width: '90%', margin: 'auto' }}>
                  <TableContainer component={Paper} elevation={24} style={{marginBottom:'2rem'}}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Seat Type</TableCell>
                          <TableCell align="right">Seat Price</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                              <TableRow component={Paper} elevation={70}>
                                <TableCell align="right">Premium</TableCell>
                                <TableCell align="right">&#8377;{seats.premium.price}</TableCell>
                                <TableCell align="right">{seats.premium.count}</TableCell>
                                <TableCell align="right">&#8377;{seats.premium.count*seats.premium.price}</TableCell>
                              </TableRow>
                              <TableRow component={Paper} elevation={70}>
                                <TableCell align="right">Normal</TableCell>
                                <TableCell align="right">&#8377;{seats.normal.price}</TableCell>
                                <TableCell align="right">{seats.normal.count}</TableCell>
                                <TableCell align="right">&#8377;{seats.normal.count*seats.normal.price}</TableCell>
                              </TableRow>
                         
                        <TableRow component={Paper} elevation={1000}>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right">Total Price</TableCell>
                          <TableCell align="right">&#8377;{sp}</TableCell>
                        </TableRow>


                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper
                textAlign='center' lineHeight='60px' elevation={100} sx={{ height: '25vh' ,overflow:'scroll'}}
              >
            <h1 style={{ paddingTop: '1rem' }}>Total Cost</h1>
     
            <Paper elevation={1000} sx={{width:'35%',paddingY:'1rem',margin:'auto'}}>&#8377;{fp+mp+sp}</Paper>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>

    </div>
  )
}

export default BillBreakout