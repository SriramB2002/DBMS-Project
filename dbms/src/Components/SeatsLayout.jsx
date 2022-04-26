import React, { useState, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import './Seats.css';
import MerchFood from './MerchFood';
const PER_PAGE = 8;
const SeatsLayout = () => {
  const { id ,sid } = useParams();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [std,setstd] = useState({});
  const [stadiums, setStadium] = useState([]);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [normal, setnormal] = useState(0);
  const [vip, setvip] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(()=>{
    const data = await axios.get()
  },[]);
  const history = useHistory();
  const offset = page * PER_PAGE;
  const rows = 100;
  const columns = 15;
  const additional = 15;
  
  useEffect(() => {
    const temp = [];

    //Number of Rows
    let e = 1;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push({ id: e, type: 'Not Available', booked: true, selected: false });
        e += 1;
      }
      temp.push(row);
    }
    const row = [];
    for (let i = 0; i < additional; i++) {
      row.push({ id: e, type: 'Not Available', booked: true, selected: false });
      e += 1;
    }
    temp.push(row);
    setStadium(temp);
    //Set Dummy Data For Stadium
    const fetchData = async () => {
      await axios.get('http://localhost:8080/get/availableseats/' + id).then(res => {
        const datar = res.data;
        setData(datar);
      });
    }
    fetchData();

  }, []);

  const handleSelect = (e) => {
    const num = e.target.dataset.key - 1;
    const rownum = Math.floor(num / columns);
    const colnum = (num) % columns;
    let temp = [...stadiums];
    // console.log(temp);
    if (temp[rownum][colnum].booked) {
      alert("Selected Seat is Not Available");
    }
    temp[rownum][colnum].selected = !temp[rownum][colnum].selected;
    setStadium(temp);
  }
  useEffect(() => {
    if (data.length == 0) {
      return;
    }
    console.log(data);
    const temp = stadiums;
    data.forEach(element => {
      // console.log(data);
      //Change Seat_ID and Seat_Type
      const rc = Math.floor((element.seat_id - 1) / columns);
      const cc = (element.seat_id - 1) % columns;
      // console.log(rc, cc);
      temp[rc][cc].booked = false;
      temp[rc][cc].seat_id = element.seat_id;
      temp[rc][cc].stadium_id = element.stadium_id;
      temp[rc][cc].seat_price = element.seat_price;
      temp[rc][cc].type = element.seat_type;
    });
    console.log(stadiums)
    setStadium(temp);
    forceUpdate();
    // setData(data);
  }, [data]);
  const handlePageClick = ({ selected: selectedPage }) => {
    
    setPage(selectedPage);
  }
  const bookSeats = () => {
      history.push({
        pathname:'/Dashboard/MerchFood',
        state:{stadiums,id}
      });
  }
  return (
    <div className='homepage' style={{ height: '150vh' }}>
      <div className='container' style={{ paddingTop: '7rem', color: 'white' }}>
        <h1 style={{ borderBottom: 'none', textAlign: 'center' }}>
          Jamtha Stadium
        </h1>
        <h2 style={{ borderBottom: 'none', textAlign: 'center' }}>Total Capacity : 4000</h2>
        <div className='container layout'>
          {/* {stadiums.map((row,index)=>(
                  <div className='row' key={index}>
                      {row.map((seat,index)=>(
                        <div className={'seat'+(seat.booked?' booked':'')+(!seat.booked && seat.selected?' selected':'')} data-key={seat.id} onClick={handleSelect} key={seat.id}></div>
                      ))}
                  </div>))} */}
                  {console.log(page)}
          {stadiums.slice(offset, offset + PER_PAGE)
            .map((row, index) => (<div className='row' key={index}>
              {row.map((seat, index) => (
                <Tooltip title={seat.type} placement="top" arrow key={seat.id}>
                      <div className={'seat' + (seat.booked ? ' booked' : '') + (!seat.booked && seat.selected ? ' selected' : '')} data-key={seat.id} onClick={handleSelect} key={seat.id}></div>
                </Tooltip>
              ))}
            </div>))}
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={Math.ceil(rows / PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
          <Button variant="contained" color="secondary" sx={{backgroundColor:'green !important'}} onClick={bookSeats}>
               Book Seats
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SeatsLayout;