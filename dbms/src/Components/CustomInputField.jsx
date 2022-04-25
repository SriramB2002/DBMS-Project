import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

function CustomInputField({ initialPrice, id }) {
  const [isClicked, setIsClicked] = React.useState(false);
  const [price, setPrice] = React.useState(initialPrice);

  const handleClick = async () => {
    setIsClicked(!isClicked);
    // await axios.post()
  };

  return isClicked ? (
    <>
      <TextField
        type="number"
        sx={{
          label: { color: "lightgray" },
          input: { color: "white" },
          fieldset: { borderColor: "lightgray !important" },
        }}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></TextField>
      {console.log(price)}
      <Button
        variant="contained"
        color="warning"
        style={{ marginRight: "4px" }}
        onClick={() => handleClick()}
      >
        Save
      </Button>
    </>
  ) : (
    <>
      {price}
      <Button
        variant="contained"
        color="warning"
        style={{ marginRight: "4px" }}
        onClick={() => setIsClicked(!isClicked)}
      >
        Update
      </Button>
    </>
  );
}

export default CustomInputField;
