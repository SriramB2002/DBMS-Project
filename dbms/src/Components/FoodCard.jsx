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
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function FoodCard({ food_item, setfooditem, index, food }) {
    const [quantity, setquantity] = useState(food_item?.food_quantity || 0);
    const [add, setadd] = useState(food_item?.added || 0);
    useEffect(() => {
        let mounted = 1;
        if(mounted){
    const newfood = [...food];
        newfood[index].food_quantity = quantity;
        setfooditem(newfood);
        }
        return () => {
            mounted = 0;
        }
        
    }, [quantity]);
    const addToCart = () => {
        if(add==1){
            setquantity(0);
        }
        setadd(prev => !prev);
        const newfood = [...food];
        newfood[index].added = !newfood[index].added;
        if (newfood[index].food_quantity == '' || newfood[index].food_quantity == 0) {
            newfood[index].added = 0;
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 7000);
            setadd(0);
            setquantity(0);
        }
        setfooditem(newfood);
        //
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    return (
        <Card sx={{ maxWidth:'20vw',minWidth:'20vw', background: 'rgb(38,50,56)'}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Please Add Non-Zero Items
                </Alert>
            </Snackbar>
            <CardMedia
                component="img"
                image={food_item.food_image}
                alt="Samosa"
                style={{ height: '25vh', background: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: 'white' }}>
                    {food_item.food_name}
                </Typography>
                <Typography gutterBottom variant="h7" component="div" style={{ color: '#E0E0E0' }}>
                    Rs. {food_item.food_price}
                </Typography>
                <TextField sx={{ label: { color: 'lightgray' }, input: { color: 'white' }, fieldset: { borderColor: 'lightgray !important' }, marginTop: '1rem' }}
                    required
                    id="outlined-required"
                    label="Quantity"
                    defaultValue=""
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                />
            </CardContent>
            <CardActions>
               
                {add == 0 ? <Button size="medium" variant='contained' sx={{ color: 'white',marginLeft:'0.5rem' }} onClick={addToCart}>Add to Cart</Button> : <Button size="medium" variant="contained" sx={{ marginLeft:'0.5rem' }} color="error" onClick={addToCart}>Remove</Button>}

            </CardActions>
        </Card>
    );
}
