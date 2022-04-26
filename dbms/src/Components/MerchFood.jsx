import React from 'react'
import FoodCard from './FoodCard';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import MerchCard from './MerchCard';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MerchFood = (props) => {
  const stadiumData = props.location.state.stadiums;
  const [food, setFood] = useState([]);
  const [merch, setMerch] = useState([]);
  useEffect(() => {
    const fetchFood = async () => {
      const data = await axios.get('http://localhost:8080/get/getFood');
      console.log(data.data);
      setFood(data.data);
    }
    const fetchMerch = async () => {
      const data = await axios.get('http://localhost:8080/user/booking/merch/avail');
      setMerch(data.data);
    }
    fetchFood();
    fetchMerch();
    return () => {
    }
  }, []);
  useEffect(() => {
    console.log(food);
  }, [food]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=''>
       
      <div className="container">
        <h1 className="he" style={{ paddingTop: '8rem' }}>Extras</h1>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' ,width:'11vw',margin:'auto'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Food" {...a11yProps(0)} style={{color:'white'}}/>
          <Tab label="Merch" {...a11yProps(1)} style={{color:'white'}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Grid container spacing={2}>
          {
            food.map((food_item,key) =>
              <Grid item xs={3} key={key}>
                <FoodCard food_item={food_item} setfooditem={setFood} index=
                {key} food={food}/>
              </Grid>
            )
          }



        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MerchCard />
      </TabPanel>
        

      </div>
    </div>
  )
}

export default MerchFood;