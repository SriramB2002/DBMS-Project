import React, { useState, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import './Seats.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MerchFood from './MerchFood';
const PER_PAGE = 10;
const columns = 15;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SnackBar({open,setOpen,message}) {
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}
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
  const [open,setOpen] = useState(false);
  useEffect(()=>{
    const fetch = async () => {
      const data = await axios.get(`http://localhost:8080/get/getstadium/${sid}`);
      // console.log(data.data[0]);
      setstd(data.data[0]);
    }
    fetch();
  },[]);
  const [rows,setrows] = useState(0);
  useEffect(() => {
    setrows(Math.ceil(std?.capacity/15));
  }, [std]);
  const history = useHistory();
  const offset = page * PER_PAGE;
  const additional = 15;
  
  useEffect(() => {
    const temp = [];
    if(!std.capacity){
      return;
    }
    console.log(std.capacity);
    //Number of Rows
    let e = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push({ id: e, type: 'Not Available', booked: true, selected: false,seat_id:e+1});
        e += 1;
      }
      temp.push(row);
    }
    const row = [];
    for (let i = 0; i < additional; i++) {
      row.push({ id: e, type: 'Not Available', booked: true, selected: false,seat_id:e+1});
      e += 1;
    }
    console.log(temp);
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

  }, [rows]);

  const handleSelect = (e) => {
    const num = e.target.dataset.key;
    const rownum = Math.floor(num / columns);
    const colnum = (num) % columns;
    let temp = [...stadiums];
    // console.log(temp);
    if (temp[rownum][colnum].booked) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 500);
      temp[rownum][colnum].selected = 0;
      return;
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
      const rc = Math.floor((element.seat_id-1) / columns);
      const cc = (element.seat_id-1) % columns;
      // console.log(rc, cc,temp);
      temp[rc][cc].booked = false;
      temp[rc][cc].seat_id = element.seat_id;
      temp[rc][cc].stadium_id = element.stadium_id;
      temp[rc][cc].seat_price = element.seat_price;
      temp[rc][cc].type = element.seat_type;
    });
    // console.log(stadiums)
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
    <div className='homepage' style={{ height: '120vh' }}>
      <div className='container' style={{ paddingTop: '7rem', color: 'white' }}>
        <h1 style={{ borderBottom: 'none', textAlign: 'center' }}>
          {std?.stadium_name}
        </h1>
        <h2 style={{ borderBottom: 'none', textAlign: 'center' }}>Total Capacity : {std?.capacity}</h2>
        <div className='container' style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'1rem'}}>
          <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          <div className='seat premium'></div>
          <div>Premium</div>
          </div>
          <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          <div className='seat' ></div>
          <div>Normal</div>
          </div>
        </div>
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
                      <div className={'seat' + (seat.booked ? ' booked' : '')  + ((!seat.booked && seat.type=='Premium') ? ' premium':'') + (!seat.booked && seat.selected ? ' selected' : '')} data-key={seat.id} onClick={handleSelect} key={seat.id}></div>
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
          <SnackBar open={open} setOpen={setOpen} message={"This Seat is Not Available"}/>
          <Button variant="contained" color="secondary" sx={{backgroundColor:'#15152d !important',marginBottom:'1rem'}} onClick={bookSeats}>
               Book Seats
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SeatsLayout;