import React from 'react'
import FoodCard from './FoodCard';

const MerchFood = (props) => {
  const stadiumData = props.location.state.stadiums;
  return (
    <div className=''>
      <div className="container">
        <h1 className="he" style={{paddingTop:'5rem'}}>Hello</h1>
        <FoodCard />
      </div>
    </div>
  )
}

export default MerchFood