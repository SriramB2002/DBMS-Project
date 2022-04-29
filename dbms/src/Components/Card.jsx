import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import ReactCountryFlag from "react-country-flag"
import './Card.css';
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useHistory } from 'react-router-dom';
export default function MatchCard(props) {
  const history = useHistory();
  const date = new Date(props.match.date_time);
  const team1 = props.match.team1_id;
  const team2 = props.match.team2_id;
  const stadium = props.match.stadium_id;
  const [stadiumList, setStadiumList] = React.useState([]);
  const [currentStadium, setCurrentStadium] = React.useState({});
  const [teamList,setTeamList] = React.useState([]);
  const [currentTeam1, setCurrentTeam1] = React.useState("");
  const [currentTeam2, setCurrentTeam2] = React.useState("");
  const redir = () => {
    history.push(`/Dashboard/Seats/${props.match.match_id}/${props.match.stadium_id}`);
  }
  useEffect(() => {
    
    const getStadiumList = async () => {
      const result = await axios('http://localhost:8080/get/stadiums', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setStadiumList(result.data);
    }
    getStadiumList();
    const getTeamNames = async () => {
      const data = await axios.post('http://localhost:8080/get/getTeam', {
        team_id: team1
      });
      console.log(data.data);
      setCurrentTeam1(data.data[0]);
      const data2 = await axios.post('http://localhost:8080/get/getTeam', {
        team_id: team2
      });
      setCurrentTeam2(data2.data[0]);
    }
    getTeamNames();
  }, []);
  useEffect(() => {
    if(stadiumList.length>0){
      for(let i=0;i<stadiumList.length;i++){
        if(stadiumList[i].stadium_id==stadium){
          setCurrentStadium(stadiumList[i]);
        }
      }
    }
  }, [stadiumList]);

  console.log(currentTeam1);
  
  return (
    <div className='d-flex' >
    <Card data-aos="flip-down" data-aos-duration="500" sx={{ minWidth: '90%' ,transition:'1s ease-in', backgroundColor:'white',color:'white',height:'8rem'}} className="fpt">
      <CardActionArea sx={{padding:'2rem'}} className='ffpr'>
      <Grid container spacing={3}>
  <Grid item xs={1} style ={{height:'100%'}}>
          <Typography variant="body1" color="white" sx={{paddingY:'0px',height:'50%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',marginTop:'1rem'}} className="fpt-small">
            <div>{props.match.match_format}</div>
          </Typography>
  </Grid>
  <Grid item xs={1.5}>
          <Typography variant="body1" color="white" sx={{paddingY:'0px',height:'50%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',marginTop:'1rem'}} className="fpt-small">
            <div>{props.match.match_type}</div>
          </Typography>
  </Grid>
  <Grid item xs={1.5}>
          <Typography variant="body1" color="white" sx={{paddingY:'0px',height:'50%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',marginTop:'1rem'}} className="fpt-small">
            <div>{date.toLocaleTimeString()}</div>
          </Typography>
  </Grid>
  <Grid item xs={1.5}>
          <Typography variant="body1" color="white" sx={{paddingY:'0px',height:'50%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',marginTop:'1rem'}} className="fpt-small">
            <div>{date.toLocaleDateString()}</div>
          </Typography>
  </Grid>
  <Grid item xs={1.5}>
          <Typography variant="body1" color="white" sx={{paddingY:'0px',height:'50%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',marginTop:'1rem'}} className="fpt-small">
            <div>{currentStadium?.stadium_name}</div>
          </Typography>
  </Grid>
  <Grid item xs={2}>
  <div style={{paddingY:'20px',height:'100%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',flexDirection:'column'}}>
    <Typography gutterBottom variant="h5" component="div" color="white" className='fpt-lg'>
          {currentTeam1.team_name} <ReactCountryFlag countryCode={currentTeam1.team_flag} svg/> 
    </Typography>
    </div>
  </Grid>
  <Grid item xs={1}>
  <div style={{paddingY:'0',height:'100%',background:'',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',flexDirection:'column'}}>
    <Typography gutterBottom variant="h5" component="div" color="white" className='fpt-lg'>
         vs
    </Typography>
    </div>
  </Grid>
  <Grid item xs={2}>
  <div style={{paddingY:'20px',height:'100%',background:'#37374F',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',flexDirection:'column'}}>
    <Typography gutterBottom variant="h5" component="div" color="white" className='fpt-lg'>
          {currentTeam2.team_name} <ReactCountryFlag countryCode={currentTeam2.team_flag} svg/> 
    </Typography>
    </div>
  </Grid>
 
</Grid>
      </CardActionArea>
    </Card>
    <Grid item xs={2} data-aos="flip-up" data-aos-duration="700">
    <Button size="small" color="primary" style={{color:'white'}} className="msrt" onClick={redir}>

      <CardActions className="msrt-2"sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px',height:'8rem'}}>
          Book Seats
      </CardActions> 
      </Button>
 
  </Grid>
    </div>
  );
}