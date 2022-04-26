import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const MerchCard = () => {
  return (
    <Card sx={{ maxWidth:350,minWidth:'15vw', background: 'rgb(38,50,56)'}}>
    <CardMedia
        component="img"
        image="https://m.media-amazon.com/images/I/71hYhhQMwIL._UL1500_.jpg"
        alt="Samosa"
        style={{maxHeight:'35vh' ,background: 'contain' }}
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ color: 'white' }}>

        </Typography>
        <Typography gutterBottom variant="h7" component="div" style={{ color: '#E0E0E0' }}>
        </Typography>
        <TextField sx={{ label: { color: 'lightgray' }, input: { color: 'white' }, fieldset: { borderColor: 'lightgray !important' }, marginTop: '1rem' }}
            required
            id="outlined-required"
            label="Quantity"
            defaultValue=""
            type="number"
            fullWidth
            value={1}
        />
    </CardContent>
    <CardActions>
       
        {/* {add == 0 ? <Button size="medium" variant='contained' sx={{ color: 'white',marginLeft:'0.5rem' }} onClick={addToCart}>Add to Cart</Button> : <Button size="medium" sx={{ color: 'red' }} onClick={addToCart}>Remove</Button>} */}

    </CardActions>
</Card>
  )
}

export default MerchCard