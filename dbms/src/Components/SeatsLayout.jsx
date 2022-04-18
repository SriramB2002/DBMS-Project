import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Seats.css';
const SeatsLayout = () => {
    const {id} = useParams();
    const [stadiums,setStadium] = useState([]);
    const [selected,setSelected] = useState([]);
    const [price,setPrice] = useState(0);
    const [normal,setnormal] = useState(0);
    const [vip,setvip] = useState(0);
    const [data,setData] = useState([]);
    const rows = 10;
    const columns = 10;
    useEffect(() => {
      const temp = []
      const additional = 7;
      //Number of Rows
      let e = 1;
      for(let i=0;i<rows;i++){
          const row = [];
          for(let j=0;j<columns;j++){
              row.push({id:e,type:'Normal',booked:true,selected:false});
              e+=1;
          }
          temp.push(row);
      }
      const row = [];
      for(let i=0;i<additional;i++){
              row.push({id:e,type:'Normal',booked:true,selected:false});
              e+=1;
      }
      temp.push(row);
      setStadium(temp);
      //Set Dummy Data For Stadium
      const fetchData = () => {
        axios.get('http://localhost:8080/get/availableseats/'+id).then(res => {
          const datar = res.data;
          setData(datar);
        });
      }
      fetchData();
    }, []);
    useEffect(() => {
        if(data.length==0){
          return;
        }
        //Change Stadium data
        // array.forEach(element => {
        //   for(let i=0;i<data.length;i++){
        //     //for Eve
        //   }  
        // });
        data.forEach(element => {
            console.log(element.seat_id);
            //Change Seat_ID and Seat_Type
            
        });


        console.log(data);
    }, [data]);
    
 
    const handleSelect = (e) =>{
        console.log(e.target.dataset.key);
        const num = e.target.dataset.key - 1;
        const rownum = Math.floor(num/columns);
        const colnum = (num)%columns;
        console.log(rownum,colnum);
        let temp = [...stadiums];
        console.log(temp);
        if(temp[rownum][colnum].booked){
            alert("Seat is already booked");
        }
        temp[rownum][colnum].selected = !temp[rownum][colnum].selected;
        setStadium(temp);
    }
  return (
    <div className='homepage' style={{height:'150vh'}}>
    <div className='container' style={{paddingTop:'7rem',color:'white'}}>
      <h1 style={{borderBottom:'none',textAlign:'center'}}>
        Jamtha Stadium
      </h1>
      <h2 style={{borderBottom:'none',textAlign:'center'}}>Total Capacity : 4000</h2>
      <div className='container layout'>
                  {stadiums.map((row,index)=>(
                  <div className='row' key={index}>
                    {console.log('gere')}
                      {row.map((seat,index)=>(
                        <div className={'seat'+(seat.booked?' booked':'')+(!seat.booked && seat.selected?' selected':'')} data-key={seat.id} onClick={handleSelect} key={seat.id}></div>
                      ))}
                  </div>))}
                 
      </div>
      </div>
  </div>
  )
}

export default SeatsLayout;