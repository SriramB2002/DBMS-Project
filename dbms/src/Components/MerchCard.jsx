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
const MerchCard = ({merch,index,setmerchitem,merch_item}) => {
    const [quantity, setquantity] = useState(merch_item?.merch_quantity || 0);
    const [add, setadd] = useState(merch_item?.added || 0);
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        const newmerch = [...merch];
        newmerch[index].merch_quantity = quantity;
        setmerchitem(newmerch);
    }, [quantity]);
    const addToCart = () => {
        if(add==1){
            setquantity(0);
        }
        setadd(prev => !prev);
        const newmerch = [...merch];
        newmerch[index].added = !newmerch[index].added;
        if (newmerch[index].merch_quantity == '' || newmerch[index].merch_quantity == 0) {
            newmerch[index].added = 0;
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 7000);
            setadd(0);
            setquantity(0);
        }
        setmerchitem(newmerch);
        //
    }
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
        <Card sx={{ maxWidth: '20vw', minWidth: '20vw', background: 'rgb(38,50,56)'}}>
           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Please Add Non-Zero Items
                </Alert>
            </Snackbar>
           <CardMedia
                component="img"
                image={merch_item.merch_image}
                alt="MI T-Shirt"
                style={{ maxHeight: '25vh', background: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: 'white' }}>
                    {merch_item.merch_name}
                </Typography>
                <Typography gutterBottom variant="h7" component="div" style={{ color: '#E0E0E0' }}>
                    Rs. {merch_item.merch_price}
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

                {add==0 ? <Button size="medium" variant='contained' sx={{ color: 'white', marginLeft: '0.5rem' }}  onClick={addToCart}>Add to Cart</Button>:<Button size="medium" variant='contained' sx={{ color: 'white', marginLeft: '0.5rem' }} onClick={addToCart} color="error">Remove</Button>}

            </CardActions>
        </Card>
    )
}

export default MerchCard