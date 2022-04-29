import * as React from "react";
import NavBar from "../Components/AdminNavbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import "./AdminDashboard.css";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { Table } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Paper } from "@mui/material";
import { TableHead } from "@mui/material";
import { textAlign } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import Modal from "../Components/Modal";
import CustomInputField from "../Components/CustomInputField";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [mname, setmname] = useState("");
  const [mprice, setmprice] = useState(null);
  const [mimg, setmimg] = useState("");

  const [fname, setfname] = useState("");
  const [fprice, setfprice] = useState(null);
  const [fimage, setfimage] = useState(null);

  const [team, setTeam] = useState("");
  const [timg, settimg] = useState("");

  const [stName, setStName] = useState("");
  const [stCity, setStCity] = useState("");
  const [capacity, setCapacity] = useState(null);
  const [country, setCountry] = useState("");
  const [premium, setPremium] = useState(null);
  const [normal, setNormal] = useState(null);

  const [team1, setFirst] = useState("");
  const [team2, setSecond] = useState("");
  const [format, setFormat] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(Date.now());
  const [stadium, setStadium] = useState("");

  const [food_price, setfood_price] = useState([]);
  const [newMerchPrice, setNewMerch] = useState(null);
  const [newFoodPrice, setNewFood] = useState(null);
  const [merchIndex, setMIndex] = useState(-1);
  const [foodIndex, setFIndex] = useState(-1);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen3(false);
  };

  const handleClose4 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen4(false);
  };

  const handleClose5 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen5(false);
  };

  const handleClose6 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen6(false);
  };

  const addMerch = async () => {
    const resp = await axios.post("http://localhost:8080/admin/addmerch", {
      merch_name: mname,
      merch_price: mprice,
      merch_image: mimg,
    });
    getMerch();
    setOpen1(true);
    setTimeout(() => {
      setOpen1(false);
    }, 7000);
  };

  const addFood = async () => {
    const resp = await axios.post("http://localhost:8080/admin/addfood", {
      food_name: fname,
      food_price: fprice,
      food_image: fimage,
    });
    getFood();
    setOpen2(true);
    setTimeout(() => {
      setOpen2(false);
    }, 7000);
  };

  const addTeam = async () => {
    const resp = await axios.post("http://localhost:8080/admin/addteams", {
      team_name: team,
      team_flag: timg,
    });
    getTeams();
    setOpen3(true);
    setTimeout(() => {
      setOpen3(false);
    }, 7000);
  };

  const addStadium = async () => {
    const resp = await axios.post("http://localhost:8080/admin/addstadium", {
      stadium_name: stName,
      city: stCity,
      country: country,
      capacity: capacity,
      premium_price: premium,
      normal_price: normal,
    });
    getStadium();
    setOpen4(true);
    setTimeout(() => {
      setOpen4(false);
    }, 7000);
  };

  const organizeMatch = async () => {
    if (team1 == team2) {
      setOpen6(true);
      setTimeout(() => {
        setOpen6(false);
      }, 7000);
    } else {
      const resp = await axios.post("http://localhost:8080/admin/match", {
        match_format: format,
        match_type: type,
        date_time: date,
        team1_id: team1,
        team2_id: team2,
        stadium_id: stadium,
      });
      setOpen5(true);
      setTimeout(() => {
        setOpen5(false);
      }, 7000);
    }
  };

  const [merch_resp, setMerch] = useState(null);
  const [food_resp, setFood] = useState(null);

  const [team_resp, setTeamList] = useState(null);
  const [stadium_resp, setStadiumList] = useState(null);

  const getMerch = async () => {
    let result = await axios.get("http://localhost:8080/get/getMerch");
    setMerch(result?.data);
  };

  const getFood = async () => {
    let result = await axios.get("http://localhost:8080/get/getFood");
    setFood(result?.data);
  };

  const getTeams = async () => {
    let result = await axios.get("http://localhost:8080/get/getallteams");
    setTeamList(result?.data);
  };

  const getStadium = async () => {
    let result = await axios.get("http://localhost:8080/get/stadiums");
    setStadiumList(result?.data);
  };

  React.useEffect(async () => {
    await getMerch();
    await getFood();
    await getTeams();
    await getStadium();
  }, []);

  const updateMerch = async (index) => {
    const resp = await axios.post("http://localhost:8080/admin/updatemerch", {
      newprice: newMerchPrice,
      merch_id: merch_resp[index].merch_id,
    });
    getMerch();
    setNewMerch(null);
    setMIndex(-1);
  };

  const updateFood = async (index) => {
    const resp = await axios.post("http://localhost:8080/admin/updatefood", {
      newprice: newFoodPrice,
      food_id: food_resp[index].food_id,
    });
    getFood();
    setNewFood(null);
    setFIndex(-1);
  };

  const deleteMerch = async (index) => {
    const resp = await axios.post("http://localhost:8080/admin/deletemerch", {
      merch_id: merch_resp[index].merch_id,
    });
    getMerch();
  };

  const deleteFood = async (index) => {
    const resp = await axios.post("http://localhost:8080/admin/deletefood", {
      food_id: food_resp[index].food_id,
    });
    getFood();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navbarItems = [];

  const [isClicked, setIsClicked] = React.useState(false);
  const changeStadium = (e) => {
    console.log(e);
    setStName(e.target.value);
  };
  return (
    <div className="homepage1">
      <NavBar navbarItems={navbarItems} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <br></br>
          <br></br>
          <br></br>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="#fff"
            centered
            aria-label="basic tabs example"
          >
            <Tab label="Add Merch" {...a11yProps(0)} />
            <Tab label="Update Merch" {...a11yProps(1)} />
            <Tab label="Add Food" {...a11yProps(2)} />
            <Tab
              onClick={() => getFood()}
              label="Update Food"
              {...a11yProps(3)}
            />
            <Tab label="Add Team" {...a11yProps(4)} />
            <Tab label="Add Stadium" {...a11yProps(5)} />
            <Tab label="New Match" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h1>Add Merch</h1>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "420px" }}
            id="merch-name"
            type={"text"}
            label="Merch Name"
            value={mname}
            onChange={(e) => setmname(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "210px" }}
            id="merch-price"
            type={"number"}
            label="Merch Price"
            value={mprice}
            onChange={(e) => setmprice(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "650px" }}
            id="merch-image-url"
            type={"url"}
            label="Merch Image URL"
            value={mimg}
            onChange={(e) => setmimg(e.target.value)}
          ></TextField>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={addMerch}>
            Add Merch
          </Button>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert
              onClose={handleClose1}
              severity="success"
              sx={{ width: "100%" }}
            >
              Merch Successfully Added!
            </Alert>
          </Snackbar>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h1>Update Merch</h1>
          <TableContainer>
            <Table style={{ border: "1px solid white" }}>
              <TableHead sx={{ backgroundColor: "#263238" }}>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Merch Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Merch Image URL
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Merch Price
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                ></TableCell>
              </TableHead>
              {merch_resp?.map((item, index) => (
                <TableBody sx={{ backgroundColor: "#37474f" }} key={index}>
                  <TableCell style={{ color: "white" }}>
                    {item?.merch_name}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {item?.merch_image}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {item?.merch_price}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => setMIndex(index)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <br></br>
          {merchIndex > -1 && (
            <div>
              <TextField
                sx={{
                  label: { color: "lightgray" },
                  input: { color: "white" },
                  fieldset: { borderColor: "lightgray !important" },
                }}
                type={"number"}
                label="Set New Merch Price"
                value={newMerchPrice}
                onChange={(e) => setNewMerch(e.target.value)}
              ></TextField>
              <br></br>
              <br></br>
              <Button
                variant="contained"
                color="success"
                onClick={() => updateMerch(merchIndex)}
              >
                Confirm
              </Button>
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <h1>Add Food</h1>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "420px" }}
            id="food-name"
            type={"text"}
            label="Food Name"
            value={fname}
            onChange={(e) => setfname(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "210px" }}
            id="food-price"
            type={"number"}
            label="Food Price"
            value={fprice}
            onChange={(e) => setfprice(e.target.value)}
          ></TextField>
          <br></br>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "650px" }}
            id="food-image"
            type={"text"}
            label="Food Image URL"
            value={fimage}
            onChange={(e) => setfimage(e.target.value)}
          ></TextField>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={addFood}>
            Add Food
          </Button>
          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert
              onClose={handleClose2}
              severity="success"
              sx={{ width: "100%" }}
            >
              Food Successfully Added
            </Alert>
          </Snackbar>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <h1>Update Food</h1>
          <TableContainer>
            <Table style={{ border: "1px solid white" }}>
              <TableHead sx={{ backgroundColor: "#263238" }}>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Food Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Food Image URL
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Food Price
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                ></TableCell>
              </TableHead>
              {food_resp?.map((item, index) => (
                <TableBody sx={{ backgroundColor: "#37474f" }} key={index}>
                  <TableCell style={{ color: "white" }}>
                    {item?.food_name}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {item?.food_image}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {item?.food_price}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => setFIndex(index)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <br></br>
          {foodIndex > -1 && (
            <div>
              <TextField
                sx={{
                  label: { color: "lightgray" },
                  input: { color: "white" },
                  fieldset: { borderColor: "lightgray !important" },
                }}
                type={"number"}
                label="Set New Food Price"
                value={newFoodPrice}
                onChange={(e) => setNewFood(e.target.value)}
              ></TextField>
              <br></br>
              <br></br>
              <Button
                variant="contained"
                color="success"
                onClick={() => updateFood(foodIndex)}
              >
                Confirm
              </Button>
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={4}>
          <h1>Add Team</h1>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "650px" }}
            id="team-name"
            type={"text"}
            label="Team Name"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "650px" }}
            id="team-image-url"
            type={"text"}
            label="Team Code"
            value={timg}
            onChange={(e) => settimg(e.target.value)}
          ></TextField>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={addTeam}>
            Add Team
          </Button>
          <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
            <Alert
              onClose={handleClose3}
              severity="success"
              sx={{ width: "100%" }}
            >
              Team Successfully Added
            </Alert>
          </Snackbar>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <h1>Add Stadium</h1>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "650px" }}
            id="stadium-name"
            type={"text"}
            label="Stadium Name"
            value={stName}
            onChange={(e) => setStName(e.target.value)}
          ></TextField>
          <br></br>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "315px" }}
            id="stadium-city"
            type={"text"}
            label="City"
            value={stCity}
            onChange={(e) => setStCity(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "315px" }}
            id="stadium-country"
            type={"text"}
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></TextField>
          <br></br>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "203px" }}
            id="stadium-capacity"
            type={"number"}
            label="Stadium Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "203px" }}
            id="premium-price"
            type={"number"}
            label="Premium Seat Price"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            style={{ margin: "10px", width: "203px" }}
            id="normal-price"
            type={"number"}
            label="Normal Seat Price"
            value={normal}
            onChange={(e) => setNormal(e.target.value)}
          ></TextField>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={addStadium}>
            Add Stadium
          </Button>
          <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose4}>
            <Alert
              onClose={handleClose4}
              severity="success"
              sx={{ width: "100%" }}
            >
              Stadium Successfully Added
            </Alert>
          </Snackbar>
        </TabPanel>

        <TabPanel value={value} index={6}>
          <h1>New Match</h1>
          <TextField
            sx={{
              label: { color: "lightgray" },
              div: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            id="team-1"
            label="Team 1"
            select
            style={{ margin: "10px", width: "340px" }}
            value={team1}
            onChange={(e) => setFirst(e.target.value)}
          >
            {team_resp?.map((item, index) => (
              <MenuItem value={item.team_id}>{item.team_name}</MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              div: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            id="team-2"
            label="Team 2"
            select
            style={{ margin: "10px", width: "340px" }}
            value={team2}
            onChange={(e) => setSecond(e.target.value)}
          >
            {team_resp?.map((item, index) => (
              <MenuItem value={item.team_id}>{item.team_name}</MenuItem>
            ))}
          </TextField>
          <br></br>
          <TextField
            sx={{
              label: { color: "lightgray" },
              div: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            id="match-format"
            label="Match Format"
            select
            style={{ margin: "10px", width: "220px" }}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <MenuItem value={"Test"}>Test</MenuItem>
            <MenuItem value={"ODI"}>ODI</MenuItem>
            <MenuItem value={"T20"}>T20</MenuItem>
          </TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              div: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            id="match-type"
            label="Match Type"
            select
            style={{ margin: "10px", width: "220px" }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"League Match"}>League Match</MenuItem>
            <MenuItem value={"Quarter-Finals"}>Quarter-Finals</MenuItem>
            <MenuItem value={"Semi-Finals"}>Semi-Finals</MenuItem>
            <MenuItem value={"Finals"}>Finals</MenuItem>
          </TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              input: { color: "white" },
              svg: {color: "white"},
              fieldset: { borderColor: "lightgray !important" },
            }}
            id="match-timestamp"
            label=""
            type={"datetime-local"}
            style={{ margin: "10px", width: "220px" }}
            value={date}
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
          ></TextField>
          <TextField
            sx={{
              label: { color: "lightgray" },
              div: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "lightgray !important" },
            }}
            id="stadium"
            label="Stadium"
            select
            style={{ margin: "10px", width: "700px" }}
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          >
            {stadium_resp?.map((item, index) => (
              <MenuItem value={item.stadium_id}>{item.stadium_name}</MenuItem>
            ))}
          </TextField>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={organizeMatch}>
            Organize Match
          </Button>
          <Snackbar open={open5} autoHideDuration={6000} onClose={handleClose5}>
            <Alert
              onClose={handleClose4}
              severity="success"
              sx={{ width: "100%" }}
            >
              Match Successfully Organized
            </Alert>
          </Snackbar>
          <Snackbar open={open6} autoHideDuration={6000} onClose={handleClose6}>
            <Alert
              onClose={handleClose6}
              severity="error"
              sx={{ width: "100%" }}
            >
              Team 1 and Team 2 cannot be same.
            </Alert>
          </Snackbar>
        </TabPanel>
      </Box>
    </div>
  );
}
