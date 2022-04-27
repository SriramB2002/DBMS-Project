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
export const CurrentBookings = () => {
    const [rows, setRows] = useState([]);
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
            console.log(temp1);
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
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center' }}>Match</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center' }}>Date</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center' }}>Seats</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center' }}>Food Items</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center' }}>Merch</TableCell>
                                <TableCell align="right" style={{ textAlign: 'center' }}>Cancel Booking</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => {
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {index}
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>


    )
}
