import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import Card from '../Components/Card';
import { useEffect,useState } from 'react';
import axios from 'axios';
const Matches = (props) => {
  //Get All Matches
const [matches, setMatches] = useState([]);
useEffect(() => {
  
    const fetchData = async () => {
        const result = await axios('http://localhost:8080/get/upcomingmatches',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = result.data;
        console.log(data);
        if(props.filter==false){
            setMatches(data);
            return;
        }
        // console.log(data);
        const currentMatches = [];
        for(let i=0;i<data.length;i++){
            if(data[i].stadium_id==props.stadium_id){
                currentMatches.push(data[i]);
            }
        }
        setMatches(currentMatches);
    };
    fetchData();

  return () => {
    
  }
}, []);

  return (
    <Grid container spacing={2}>
        {matches.map((match, index) => (
            <Grid item xs={12} key={index}>
            <Card key={index} match={match} stadium={props.stadium}/>
            </Grid>
        ))}

            
    </Grid>
  )
}

export default Matches