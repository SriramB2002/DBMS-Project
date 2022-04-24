import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FoodCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        image="https://static.toiimg.com/thumb/61050397.cms?width=1200&height=900"
        alt="Samosa"
        style={{height:'30vh',background:'contain'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Samosa
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
