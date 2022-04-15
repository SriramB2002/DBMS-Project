import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MatchCard(props) {
  const date = new Date(props.match.date_time);
  const team1 = props.match.team1_id;
  const team2 = props.match.team2_id;
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
          
          <Typography variant="body1" color="text.secondary">
           {date.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
           {date.toLocaleTimeString()}
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
