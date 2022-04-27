import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect, useState } from 'react'
import AuthContext from '../Shared/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
export const CurrentBookings = () => {
    const [rows, setRows] = useState([]);
    const [foodIndex, setFoodIndex] = useState(null);
    const [merchIndex, setMerchIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const fd = (index) => {
        setFoodIndex(index);
        setMerchIndex(null);
        setDeleteIndex(null);
    }

    const mr = (index) => {
        setFoodIndex(null);
        setMerchIndex(index);
        setDeleteIndex(null);
    }

    const del = (index) => {
        setFoodIndex(null);
        setMerchIndex(null);
        setDeleteIndex(index);
    }

    const { auth, setAuth } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            };
            const data = await axios.get('http://localhost:8080/user/booking/getBookings', {
                headers: headers
            });
            console.log(data.data);
            setBookings(data.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(bookings.length==0){
            return;
        }
        console.log(bookings);
        const temp = [];
        bookings.forEach(booking => {
            const temp1 = booking;
            axios.post('http://localhost:8080/get/getTeam',{
                team_id:temp1.match[0].team1_id
            }).then(res=>{
                temp1.match.team1_name = res.data;
            });
            axios.post('http://localhost:8080/get/getTeam',{
                team_id:temp1.match[0].team2_id
            }).then(res=>{
                temp1.match.team2_name = res.data;
            });
            let prem = {};
            let norm = {};
            prem.cnt = 0;
            norm.cnt = 0;
            booking.seats.forEach((seat)=>{
                if(seat.seat_type=='Premium'){
                    prem.cnt++;
                    prem.price = seat.seat_price;
                }
                else if(seat.seat_type=='Normal'){
                    norm.cnt++;
                    norm.price = seat.seat_price;
                }
            });
            temp1.prem = prem;
            temp1.norm = norm;
            temp1.dateTime = temp1.match[0].date_time;
            temp.push(temp1);
        });
        setRows(temp);
    }, [bookings]);
    useEffect(()=>{
        console.log(rows);
    },[rows]);
    return (
        <div className='homepage' style={{ paddingTop: '5rem' }}>
            <h1 className='he'>Current Bookings</h1>
            <div>
                <TableContainer component={Paper} sx={{width:'80%',margin:'auto'}}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#263238" }}>
                            <TableRow>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Match</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Seats (Premium/Normal)</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Food Items</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Merch</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Cancel Booking</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#37474f" }}>
                       
                            {
                                rows.map((row, index) => {
                                    return(
                                    <TableRow
                                        key={index}
                                        
                                    >
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            {console.log(index,row)}
                                            {index+1}
                                        </TableCell>
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            {row.match[0].match_format}
                                        </TableCell>
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            {row.dateTime}
                                        </TableCell>
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            {row.prem.cnt}/{row.norm.cnt}
                                        </TableCell>
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            <Button variant='contained' color='warning' onClick={() => fd(index)}>View Food</Button>
                                        </TableCell>
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            <Button variant='contained' color='primary' onClick={() => mr(index)}>View Merch</Button>
                                        </TableCell>
                                        <TableCell align="right" style={{ textAlign: 'center', color: 'white' }}>
                                            <Button variant='contained' color='error'>Cancel Booking</Button>
                                        </TableCell >
                                    </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br></br>
                {foodIndex > -1 && (
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#263238" }}>
                                <TableCell style={{color: 'white'}}></TableCell>
                            </TableHead>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>


    )
}
