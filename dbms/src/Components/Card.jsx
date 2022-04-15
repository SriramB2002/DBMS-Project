import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function MatchCard(props) {
  const date = new Date(props.match.date_time);
  const team1 = props.match.team1_id;
  const team2 = props.match.team2_id;
  const stadium = props.match.stadium_id;
  const [stadiumList, setStadiumList] = React.useState([]);
  const [currentStadium, setCurrentStadium] = React.useState({});
  const [teamList,setTeamList] = React.useState([]);
  const [currentTeam1, setCurrentTeam1] = React.useState("");
  const [currentTeam2, setCurrentTeam2] = React.useState("");

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
      const data = await axios.post('http://localhost:8080/get/getTeamName', {
        team_id: team1
      });
      console.log(data.data);
      setCurrentTeam1(data.data[0].team_name);
      const data2 = await axios.post('http://localhost:8080/get/getTeamName', {
        team_id: team2
      });
      setCurrentTeam2(data2.data[0].team_name);
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

  return (
    <Card sx={{ maxWidth: 375 ,marginTop:'2.5rem',transition:'1s ease-in'}}>
      <CardActionArea>
        <CardContent>
          {/* <CardMedia> */}
          <Typography gutterBottom variant="h5" component="div">
          {currentTeam1} vs {currentTeam2}
          <Typography variant="body1" color="text.primary">
       
          {props.match.match_type}    
          </Typography>
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