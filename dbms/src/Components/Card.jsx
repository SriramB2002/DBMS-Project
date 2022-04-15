import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
export default function MatchCard(props) {
  const date = new Date(props.match.date_time);
  const team1 = props.match.team1_id;
  const team2 = props.match.team2_id;
  const stadium = props.match.stadium_id;
  const [stadiumList, setStadiumList] = React.useState([]);
  const [currentStadium, setCurrentStadium] = React.useState({});
  const [teamList,setTeamList] = React.useState([]);

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
    const getTeamList = async () => {
      // const 
    }
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

  
  const getTeamName = (team) => {
    
  }
  return (
    <Card sx={{ maxWidth: 345 ,marginTop:'2.5rem',transition:'1s ease-in'}}>
      <CardActionArea>
        <CardContent>
          {/* <CardMedia> */}
          <Typography gutterBottom variant="h5" component="div">
          {props.match.match_type} - {team1} vs {team2}
          <Typography variant="body2" color="text.secondary">
            {props.match.match_format}
          </Typography>
          </Typography>
          {console.log(stadiumList)}
          <Typography variant="body2" color="text.secondary">
           {date.toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {date.toLocaleTimeString()}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {currentStadium?.stadium_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentStadium?.city},  {currentStadium?.country}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Book Seats
        </Button>
      </CardActions>
    </Card>
  );
}